import { comparePassword, hashPassword } from "../../utils/password.util.js";
import { jwtGenerateAccess, jwtGenerateRefresh, jwtVerifyRefresh, jwtGeneratePasswordReset, jwtVerifyPasswordReset } from "../../utils/jwt.util.js";
import { queryMany, queryOne } from "../../utils/db.util.js";
import { sendPasswordResetEmail } from "../../utils/email.util.js";
import { OAuth2Client } from "google-auth-library";

const google_client_id = process.env.GOOGLE_CLIENT_ID || "";
const google = google_client_id ? new OAuth2Client(google_client_id) : null;

async function getUserWithRoles(user_id) {
  const user = await queryOne("SELECT id, email, username, first_name, last_name, phone, default_role_id FROM system_users WHERE id = ?", [user_id]);
  if (!user) return null;

  const roles = await queryMany(
    `SELECT r.id, r.name 
     FROM system_user_roles ur 
     JOIN system_roles r ON ur.role_id = r.id 
     WHERE ur.user_id = ?`,
    [user_id]
  );

  const role_lookup = new Map(roles.map((r) => [r.id, r.name]));
  const default_role_name = user.default_role_id ? role_lookup.get(user.default_role_id) : undefined;
  const active_role = default_role_name || roles[0]?.name || "user";

  return {
    ...user,
    role: active_role,
    roles,
    default_role_id: user.default_role_id || null,
  };
}

export async function fnAuthSignUp(email, first_name, last_name, phone, password) {
  const existing = await queryOne("SELECT id FROM system_users WHERE email = ?", [email]);
  if (existing) throw new Error("Email already exists");

  const hashed_password = await hashPassword(password);

  const result = await queryMany("INSERT INTO system_users (email, username, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?, ?)", [email, email, first_name, last_name, phone, hashed_password]);
  const user_id = result.insertId;

  const role_result = await queryMany("SELECT id FROM system_roles WHERE name = ?", ["user"]);
  if (role_result.length > 0) {
    await queryMany("INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)", [user_id, role_result[0].id]);
    await queryMany("UPDATE system_users SET default_role_id = ? WHERE id = ?", [role_result[0].id, user_id]);
  }

  const user = await getUserWithRoles(user_id);

  const token_payload = {
    user_id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };

  return {
    access_token: jwtGenerateAccess(token_payload),
    refresh_token: jwtGenerateRefresh({ user_id }),
    user,
  };
}

export async function fnAuthSignIn(email, password) {
  const user = await queryOne("SELECT id, email, username, first_name, last_name, phone, password FROM system_users WHERE email = ?", [email]);
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const userWithRoles = await getUserWithRoles(user.id);

  return {
    access_token: jwtGenerateAccess({
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    }),
    refresh_token: jwtGenerateRefresh({ user_id: user.id }),
    user: userWithRoles,
  };
}

export async function fnAuthSignInWithGoogle(id_token) {
  if (!google) throw new Error("Google client not configured");

  const ticket = await google.verifyIdToken({
    idToken: id_token,
    audience: google_client_id,
  });

  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email) {
    throw new Error("Invalid Google token");
  }

  const google_id = payload.sub;
  const email = payload.email;
  const first_name = payload.given_name || "";
  const last_name = payload.family_name || "";

  let user = await queryOne("SELECT id, email, username FROM system_users WHERE google_id = ? OR email = ?", [google_id, email]);

  if (!user) {
    const result = await queryMany("INSERT INTO system_users (email, username, first_name, last_name, google_id) VALUES (?, ?, ?, ?, ?)", [email, email, first_name, last_name, google_id]);
    const user_id = result.insertId;

    const role_result = await queryMany("SELECT id FROM system_roles WHERE name = ?", ["user"]);
    if (role_result.length > 0) {
      await queryMany("INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)", [user_id, role_result[0].id]);
      await queryMany("UPDATE system_users SET default_role_id = ? WHERE id = ?", [role_result[0].id, user_id]);
    }

    user = await getUserWithRoles(user_id);
  } else {
    user = await getUserWithRoles(user.id);
  }

  return {
    access_token: jwtGenerateAccess({
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    }),
    refresh_token: jwtGenerateRefresh({ user_id: user.id }),
    user,
  };
}

export async function fnAuthRefreshToken(refresh_token) {
  const decoded = jwtVerifyRefresh(refresh_token);
  if (!decoded) throw new Error("Invalid refresh token");

  const user = await queryOne("SELECT id FROM system_users WHERE id = ?", [decoded.user_id]);
  if (!user) throw new Error("User not found");

  return {
    access_token: jwtGenerateAccess({ user_id: user.id }),
    refresh_token: jwtGenerateRefresh({ user_id: user.id }),
  };
}

export async function fnAuthForgotPassword(email) {
  const user = await queryOne("SELECT id FROM system_users WHERE email = ?", [email]);
  if (!user) return;
  const token = jwtGeneratePasswordReset(user.id);
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:3000";
  const reset_url = `${frontend_url}/auth/reset?token=${token}`;
  await sendPasswordResetEmail(email, reset_url);
}

export async function fnAuthResetPassword(token, new_password) {
  const decoded = jwtVerifyPasswordReset(token);
  if (!decoded?.user_id) throw new Error("Invalid or expired reset token");
  const hashed = await hashPassword(new_password);
  await queryMany("UPDATE system_users SET password = ? WHERE id = ?", [hashed, decoded.user_id]);
}
