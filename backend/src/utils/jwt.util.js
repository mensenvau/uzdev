import jwt from 'jsonwebtoken'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret-key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-key'
const JWT_EMAIL_VERIFY_SECRET = process.env.JWT_EMAIL_VERIFY_SECRET || 'email-verify-secret-key'
const JWT_PASSWORD_RESET_SECRET = process.env.JWT_PASSWORD_RESET_SECRET || 'password-reset-secret-key'

export function jwtGenerateAccess(payload) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' })
}

export function jwtGenerateRefresh(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

export function jwtGenerateEmailVerify(userId) {
  return jwt.sign({ userId }, JWT_EMAIL_VERIFY_SECRET, { expiresIn: '24h' })
}

export function jwtGeneratePasswordReset(userId) {
  return jwt.sign({ userId }, JWT_PASSWORD_RESET_SECRET, { expiresIn: '1h' })
}

export function jwtVerifyAccess(token) {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET)
  } catch (error) {
    return null
  }
}

export function jwtVerifyRefresh(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET)
  } catch (error) {
    return null
  }
}

export function jwtVerifyEmailVerify(token) {
  try {
    return jwt.verify(token, JWT_EMAIL_VERIFY_SECRET)
  } catch (error) {
    return null
  }
}

export function jwtVerifyPasswordReset(token) {
  try {
    return jwt.verify(token, JWT_PASSWORD_RESET_SECRET)
  } catch (error) {
    return null
  }
}

export default {
  jwtGenerateAccess,
  jwtGenerateRefresh,
  jwtGenerateEmailVerify,
  jwtGeneratePasswordReset,
  jwtVerifyAccess,
  jwtVerifyRefresh,
  jwtVerifyEmailVerify,
  jwtVerifyPasswordReset
}
