import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env.config.js'

/**
 * Generate access token
 * @param {Object} payload - Token payload
 * @returns {string} JWT token
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, envConfig.JWT_SECRET, {
    expiresIn: envConfig.JWT_EXPIRES_IN
  })
}

/**
 * Generate refresh token
 * @param {Object} payload - Token payload
 * @returns {string} JWT refresh token
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, envConfig.JWT_REFRESH_SECRET, {
    expiresIn: envConfig.JWT_REFRESH_EXPIRES_IN
  })
}

/**
 * Verify access token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null
 */
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, envConfig.JWT_SECRET)
  } catch (error) {
    console.error('Access token verification failed:', error.message)
    return null
  }
}

/**
 * Verify refresh token
 * @param {string} token - JWT refresh token
 * @returns {Object|null} Decoded payload or null
 */
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, envConfig.JWT_REFRESH_SECRET)
  } catch (error) {
    console.error('Refresh token verification failed:', error.message)
    return null
  }
}

/**
 * Generate email verification token
 * @param {number} userId - User ID
 * @returns {string} Verification token
 */
export function generateEmailVerificationToken(userId) {
  return jwt.sign({ userId, type: 'email_verification' }, envConfig.JWT_SECRET, {
    expiresIn: envConfig.EMAIL_VERIFICATION_EXPIRES_IN
  })
}

/**
 * Verify email verification token
 * @param {string} token - Verification token
 * @returns {Object|null} Decoded payload or null
 */
export function verifyEmailVerificationToken(token) {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET)
    if (decoded.type !== 'email_verification') {
      return null
    }
    return decoded
  } catch (error) {
    console.error('Email verification token invalid:', error.message)
    return null
  }
}

/**
 * Generate password reset token
 * @param {number} userId - User ID
 * @returns {string} Reset token
 */
export function generatePasswordResetToken(userId) {
  return jwt.sign({ userId, type: 'password_reset' }, envConfig.JWT_SECRET, {
    expiresIn: envConfig.PASSWORD_RESET_EXPIRES_IN
  })
}

/**
 * Verify password reset token
 * @param {string} token - Reset token
 * @returns {Object|null} Decoded payload or null
 */
export function verifyPasswordResetToken(token) {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET)
    if (decoded.type !== 'password_reset') {
      return null
    }
    return decoded
  } catch (error) {
    console.error('Password reset token invalid:', error.message)
    return null
  }
}

/**
 * Generate form access token (public link)
 * @param {number} formId - Form ID
 * @param {Date|null} expiresAt - Expiration date
 * @returns {string} Form access token
 */
export function generateFormAccessToken(formId, expiresAt = null) {
  const payload = { formId, type: 'form_access' }
  const options = {}

  if (expiresAt) {
    options.expiresIn = Math.floor((expiresAt.getTime() - Date.now()) / 1000)
  }

  return jwt.sign(payload, envConfig.JWT_SECRET, options)
}

/**
 * Verify form access token
 * @param {string} token - Form access token
 * @returns {Object|null} Decoded payload or null
 */
export function verifyFormAccessToken(token) {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET)
    if (decoded.type !== 'form_access') {
      return null
    }
    return decoded
  } catch (error) {
    console.error('Form access token invalid:', error.message)
    return null
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  generateFormAccessToken,
  verifyFormAccessToken
}
