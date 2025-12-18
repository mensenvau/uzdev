import { comparePassword, hashPassword } from "../../utils/password.util.js";
import { jwtGenerateAccess, jwtGenerateRefresh, jwtVerifyRefresh, jwtGeneratePasswordReset, jwtVerifyPasswordReset } from "../../utils/jwt.util.js";
import { prisma } from "../../utils/prisma.util.js";
import { sendPasswordResetEmail } from "../../utils/email.util.js";
import { OAuth2Client } from "google-auth-library";

const google_client_id = process.env.GOOGLE_CLIENT_ID || "";
const google_client = google_client_id ? new OAuth2Client(google_client_id) : null;

async function getUserWithRoles(user_id) {
  const user = await prisma.user.findUnique({
    where: { id: Number(user_id) },
    include: {
      default_role: true,
      roles: { include: { role: true } },
      groups: { include: { group: true } },
    },
  });
  if (!user) return null;

  const role_list = user.roles.map((user_role) => user_role.role);
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
    default_role: user.default_role || null,
    role: active_role,
    roles: role_list,
    groups: user.groups.map((group_link) => group_link.group),
  };
}

export async function fnAuthSignUp(email, first_name, last_name, phone, password) {
  const existing_user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing_user) throw new Error("Email already exists");

  const hashed_password = await hashPassword(password);
  const role_user = await prisma.role.findUnique({ where: { name: "user" } });

  const created_user = await prisma.$transaction(async (tx) => {
    return tx.user.create({
      data: {
        email,
        username: email,
        first_name,
        last_name,
        phone,
        password: hashed_password,
        default_role_id: role_user?.id ?? null,
        roles: role_user
          ? {
              create: [{ role: { connect: { id: role_user.id } } }],
            }
          : undefined,
      },
    });
  });

  const hydrated_user = await getUserWithRoles(created_user.id);

  const token_payload = {
    user_id: created_user.id,
    email: hydrated_user?.email || email,
    first_name: hydrated_user?.first_name || first_name,
    last_name: hydrated_user?.last_name || last_name,
  };

  return {
    access_token: jwtGenerateAccess(token_payload),
    refresh_token: jwtGenerateRefresh({ user_id: created_user.id }),
    user: hydrated_user,
  };
}

export async function fnAuthSignIn(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, username: true, first_name: true, last_name: true, phone: true, password: true },
  });
  if (!user?.password) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const hydrated_user = await getUserWithRoles(user.id);

  return {
    access_token: jwtGenerateAccess({
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    }),
    refresh_token: jwtGenerateRefresh({ user_id: user.id }),
    user: hydrated_user,
  };
}

export async function fnAuthSignInWithGoogle(id_token) {
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

  let user = await prisma.user.findFirst({
    where: { OR: [{ google_id }, { email }] },
    select: { id: true },
  });

  if (!user) {
    const role_user = await prisma.role.findUnique({ where: { name: "user" } });
    user = await prisma.$transaction(async (tx) => {
      return tx.user.create({
        data: {
          email,
          username: email,
          first_name,
          last_name,
          google_id,
          default_role_id: role_user?.id ?? null,
          roles: role_user ? { create: [{ role: { connect: { id: role_user.id } } }] } : undefined,
        },
      });
    });
  }

  const hydrated_user = await getUserWithRoles(user.id);

  return {
    access_token: jwtGenerateAccess({
      user_id: user.id,
      email: hydrated_user?.email || email,
      first_name: hydrated_user?.first_name || first_name,
      last_name: hydrated_user?.last_name || last_name,
    }),
    refresh_token: jwtGenerateRefresh({ user_id: user.id }),
    user: hydrated_user,
  };
}

export async function fnAuthRefreshToken(refresh_token) {
  const decoded = jwtVerifyRefresh(refresh_token);
  if (!decoded) throw new Error("Invalid refresh token");

  const user = await prisma.user.findUnique({ where: { id: Number(decoded.user_id) }, select: { id: true } });
  if (!user) throw new Error("User not found");

  return {
    access_token: jwtGenerateAccess({ user_id: user.id }),
    refresh_token: jwtGenerateRefresh({ user_id: user.id }),
  };
}

export async function fnAuthForgotPassword(email) {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
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
  await prisma.user.update({ where: { id: Number(decoded.user_id) }, data: { password: hashed } });
}
