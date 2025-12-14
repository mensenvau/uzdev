import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret-key";
const JWT_PASSWORD_RESET_SECRET = process.env.JWT_PASSWORD_RESET_SECRET || "password-reset-secret-key";
const JWT_FORM_ACCESS_SECRET = process.env.JWT_FORM_ACCESS_SECRET || "form-access-secret-key";

export function jwtGenerateAccess(payload) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function jwtGenerateRefresh(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function jwtGeneratePasswordReset(user_id) {
  return jwt.sign({ user_id }, JWT_PASSWORD_RESET_SECRET, { expiresIn: "1h" });
}

export function jwtGenerateFormAccess(form_id, expires_at = null) {
  const payload = { form_id };
  const options = {};

  if (expires_at) {
    options.expiresIn = Math.floor((new Date(expires_at).getTime() - Date.now()) / 1000);
  }

  return jwt.sign(payload, JWT_FORM_ACCESS_SECRET, options);
}

export function jwtVerifyAccess(token) {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
}

export function jwtVerifyRefresh(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}

export function jwtVerifyPasswordReset(token) {
  try {
    return jwt.verify(token, JWT_PASSWORD_RESET_SECRET);
  } catch (error) {
    return null;
  }
}

export function jwtVerifyFormAccess(token) {
  try {
    return jwt.verify(token, JWT_FORM_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
}

export default {
  jwtGenerateAccess,
  jwtGenerateRefresh,
  jwtGeneratePasswordReset,
  jwtGenerateFormAccess,
  jwtVerifyAccess,
  jwtVerifyRefresh,
  jwtVerifyPasswordReset,
  jwtVerifyFormAccess,
};
