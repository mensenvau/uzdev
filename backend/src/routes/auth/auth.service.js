const { comparePassword, hashPassword } = require("../../utils/password.util");
const { signAccessToken, signRefreshToken, verifyRefreshToken, signPasswordResetToken, verifyPasswordResetToken } = require("../../utils/jwt.util");
const { queryMany, queryOne } = require("../../utils/db");
const { sendPasswordResetEmail } = require("../../utils/email.util");
const { OAuth2Client } = require("google-auth-library");

const google_client_id = process.env.GOOGLE_CLIENT_ID || "";
const google_client = google_client_id ? new OAuth2Client(google_client_id) : null;

async function getUserWithRoles(user_id) {
  const user = await queryOne("SELECT * FROM system_users WHERE id = ?", [Number(user_id)]);
  if (!user) return null;

  const [default_role, roles, groups] = await Promise.all([
    user.default_role_id ? queryOne("SELECT * FROM system_roles WHERE id = ?", [user.default_role_id]) : Promise.resolve(null),
    queryMany(`SELECT r.* FROM system_roles r INNER JOIN system_user_roles ur ON ur.role_id = r.id WHERE ur.user_id = ?`, [Number(user_id)]),
    queryMany(`SELECT g.* FROM system_groups g INNER JOIN system_group_users gu ON gu.group_id = g.id WHERE gu.user_id = ?`, [Number(user_id)]),
  ]);

  const role_list = roles;
  const role_lookup = new Map(role_list.map((role) => [role.id, role.name]));
  const default_role_name = user.default_role_id ? role_lookup.get(user.default_role_id) : undefined;
  const active_role = default_role_name || role_list[0]?.name || "user";

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    default_role_id: user.default_role_id || null,
    default_role: default_role || null,
    role: active_role,
    roles: role_list,
    groups: groups,
  };
}

async function fnAuthSignUp(email, first_name, last_name, phone, password) {
  const existing = await queryMany("SELECT id FROM system_users WHERE email = ?", [email]);
  if (existing.length > 0) throw new Error("Email already exists");

  const hashed_password = await hashPassword(password);

  const role_res = await queryMany("SELECT id FROM system_roles WHERE name = ?", ["user"]);
  const role_user_id = role_res[0]?.id || null;

  const user_res = await queryMany("INSERT INTO system_users (email, username, first_name, last_name, phone, password, default_role_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [email, email, first_name, last_name, phone, hashed_password, role_user_id]);
  const created_user_id = user_res.insertId;

  if (role_user_id) {
    await queryMany("INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)", [created_user_id, role_user_id]);
  }

  const hydrated_user = await getUserWithRoles(created_user_id);

  const token_payload = {
    user_id: created_user_id,
    email: hydrated_user?.email || email,
    first_name: hydrated_user?.first_name || first_name,
    last_name: hydrated_user?.last_name || last_name,
  };

  return {
    access_token: signAccessToken(token_payload),
    refresh_token: signRefreshToken({ user_id: created_user_id }),
    user: hydrated_user,
  };
}

async function fnAuthSignIn(email, password) {
  const users = await queryMany("SELECT id, email, username, first_name, last_name, phone, password FROM system_users WHERE email = ?", [email]);

  if (!users || users.length === 0 || !users[0].password) {
    throw new Error("Invalid credentials");
  }

  const user = users[0];
  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const hydrated_user = await getUserWithRoles(user.id);

  return {
    access_token: signAccessToken({
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    }),
    refresh_token: signRefreshToken({ user_id: user.id }),
    user: hydrated_user,
  };
}

async function fnAuthSignInWithGoogle(id_token) {
  if (!google_client) throw new Error("Google client not configured");

  const ticket = await google_client.verifyIdToken({
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

  let users = await queryMany("SELECT id FROM system_users WHERE google_id = ? OR email = ?", [google_id, email]);
  let user_id;

  if (users.length === 0) {
    const role_res = await queryMany("SELECT id FROM system_roles WHERE name = ?", ["user"]);
    const role_user_id = role_res[0]?.id || null;

    const user_res = await queryMany("INSERT INTO system_users (email, username, first_name, last_name, google_id, default_role_id) VALUES (?, ?, ?, ?, ?, ?)", [email, email, first_name, last_name, google_id, role_user_id]);
    const new_user_id = user_res.insertId;

    if (role_user_id) {
      await queryMany("INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)", [new_user_id, role_user_id]);
    }
    user_id = new_user_id;
  } else {
    user_id = users[0].id;
  }

  const hydrated_user = await getUserWithRoles(user_id);

  return {
    access_token: signAccessToken({
      user_id: user_id,
      email: hydrated_user?.email || email,
      first_name: hydrated_user?.first_name || first_name,
      last_name: hydrated_user?.last_name || last_name,
    }),
    refresh_token: signRefreshToken({ user_id: user_id }),
    user: hydrated_user,
  };
}

async function fnAuthRefreshToken(refresh_token) {
  const decoded = verifyRefreshToken(refresh_token);
  if (!decoded) throw new Error("Invalid refresh token");

  const users = await queryMany("SELECT id FROM system_users WHERE id = ?", [Number(decoded.user_id)]);
  if (users.length === 0) throw new Error("User not found");

  return {
    access_token: signAccessToken({ user_id: users[0].id }),
    refresh_token: signRefreshToken({ user_id: users[0].id }),
  };
}

async function fnAuthForgotPassword(email) {
  const users = await queryMany("SELECT id FROM system_users WHERE email = ?", [email]);
  if (users.length === 0) return;

  const token = signPasswordResetToken(users[0].id);
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:3000";
  const reset_url = `${frontend_url}/auth/reset?token=${token}`;
  await sendPasswordResetEmail(email, reset_url);
}

async function fnAuthResetPassword(token, new_password) {
  const decoded = verifyPasswordResetToken(token);
  if (!decoded?.user_id) throw new Error("Invalid or expired reset token");

  const hashed = await hashPassword(new_password);
  await queryMany("UPDATE system_users SET password = ? WHERE id = ?", [hashed, Number(decoded.user_id)]);
}

module.exports = {
  fnAuthSignUp,
  fnAuthSignIn,
  fnAuthSignInWithGoogle,
  fnAuthRefreshToken,
  fnAuthForgotPassword,
  fnAuthResetPassword,
};
