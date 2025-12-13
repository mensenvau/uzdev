import { query, queryOne, transaction } from '../../config/db.config.js'
import { hashPassword, comparePassword } from '../../utils/password.util.js'
import {
  generateAccessToken,
  generateRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  verifyRefreshToken
} from '../../utils/jwt.util.js'
import { ROLES } from '../../constants/roles.constant.js'

/**
 * Sign up a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user and tokens
 */
export async function authSignUp({ email, username, password }) {
  // Check if user already exists
  const existingUser = await queryOne(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  )

  if (existingUser) {
    throw new Error('Email or username already exists')
  }

  // Hash password
  const passwordHash = await hashPassword(password)

  // Create user in transaction
  const result = await transaction(async (conn) => {
    // Insert user
    const [userResult] = await conn.execute(
      'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
      [email, username, passwordHash]
    )

    const userId = userResult.insertId

    // Assign default 'user' role
    const [roleResult] = await conn.execute(
      'SELECT id FROM roles WHERE name = ?',
      [ROLES.USER]
    )

    if (roleResult.length > 0) {
      await conn.execute(
        'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
        [userId, roleResult[0].id]
      )
    }

    return userId
  })

  // Get created user
  const user = await queryOne(
    'SELECT id, email, username, is_email_verified, created_at FROM users WHERE id = ?',
    [result]
  )

  // Generate tokens
  const accessToken = generateAccessToken({ userId: user.id })
  const refreshToken = generateRefreshToken({ userId: user.id })

  // Generate email verification token
  const emailVerificationToken = generateEmailVerificationToken(user.id)

  // Store email verification token
  await query(
    'INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))',
    [user.id, emailVerificationToken]
  )

  return {
    user,
    accessToken,
    refreshToken,
    emailVerificationToken
  }
}

/**
 * Sign in user with email/username and password
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} User and tokens
 */
export async function authSignIn({ login, password }) {
  // Find user by email or username
  const user = await queryOne(
    'SELECT id, email, username, password_hash, is_email_verified FROM users WHERE email = ? OR username = ?',
    [login, login]
  )

  if (!user) {
    throw new Error('Invalid credentials')
  }

  // Check password
  const isPasswordValid = await comparePassword(password, user.password_hash)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  // Generate tokens
  const accessToken = generateAccessToken({ userId: user.id })
  const refreshToken = generateRefreshToken({ userId: user.id })

  // Remove password hash from response
  delete user.password_hash

  return {
    user,
    accessToken,
    refreshToken
  }
}

/**
 * Sign in with Google (placeholder - needs OAuth implementation)
 * @param {Object} googleData - Google user data
 * @returns {Promise<Object>} User and tokens
 */
export async function authSignInWithGoogle({ googleId, email, username }) {
  // Check if user exists with this Google ID
  let user = await queryOne(
    'SELECT id, email, username, is_email_verified FROM users WHERE google_id = ?',
    [googleId]
  )

  if (!user) {
    // Create new user
    const result = await transaction(async (conn) => {
      const [userResult] = await conn.execute(
        'INSERT INTO users (email, username, google_id, is_email_verified) VALUES (?, ?, ?, TRUE)',
        [email, username || email.split('@')[0], googleId]
      )

      const userId = userResult.insertId

      // Assign default 'user' role
      const [roleResult] = await conn.execute(
        'SELECT id FROM roles WHERE name = ?',
        [ROLES.USER]
      )

      if (roleResult.length > 0) {
        await conn.execute(
          'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
          [userId, roleResult[0].id]
        )
      }

      return userId
    })

    user = await queryOne(
      'SELECT id, email, username, is_email_verified FROM users WHERE id = ?',
      [result]
    )
  }

  // Generate tokens
  const accessToken = generateAccessToken({ userId: user.id })
  const refreshToken = generateRefreshToken({ userId: user.id })

  return {
    user,
    accessToken,
    refreshToken
  }
}

/**
 * Verify email with token
 * @param {string} token - Email verification token
 * @returns {Promise<boolean>}
 */
export async function authVerifyEmail(token) {
  // Verify token
  const decoded = verifyEmailVerificationToken(token)

  if (!decoded) {
    throw new Error('Invalid or expired verification token')
  }

  // Check if token exists in database
  const tokenRecord = await queryOne(
    'SELECT id, user_id FROM email_verification_tokens WHERE token = ? AND expires_at > NOW()',
    [token]
  )

  if (!tokenRecord) {
    throw new Error('Invalid or expired verification token')
  }

  // Update user email verification status
  await query(
    'UPDATE users SET is_email_verified = TRUE WHERE id = ?',
    [tokenRecord.user_id]
  )

  // Delete used token
  await query(
    'DELETE FROM email_verification_tokens WHERE id = ?',
    [tokenRecord.id]
  )

  return true
}

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New tokens
 */
export async function authRefreshToken(refreshToken) {
  // Verify refresh token
  const decoded = verifyRefreshToken(refreshToken)

  if (!decoded) {
    throw new Error('Invalid or expired refresh token')
  }

  // Check if user still exists
  const user = await queryOne(
    'SELECT id FROM users WHERE id = ?',
    [decoded.userId]
  )

  if (!user) {
    throw new Error('User not found')
  }

  // Generate new tokens
  const accessToken = generateAccessToken({ userId: user.id })
  const newRefreshToken = generateRefreshToken({ userId: user.id })

  return {
    accessToken,
    refreshToken: newRefreshToken
  }
}

/**
 * Resend email verification
 * @param {number} userId - User ID
 * @returns {Promise<string>} New verification token
 */
export async function authResendVerification(userId) {
  // Check if user exists and is not verified
  const user = await queryOne(
    'SELECT id, is_email_verified FROM users WHERE id = ?',
    [userId]
  )

  if (!user) {
    throw new Error('User not found')
  }

  if (user.is_email_verified) {
    throw new Error('Email already verified')
  }

  // Delete old tokens
  await query(
    'DELETE FROM email_verification_tokens WHERE user_id = ?',
    [userId]
  )

  // Generate new token
  const emailVerificationToken = generateEmailVerificationToken(userId)

  // Store new token
  await query(
    'INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))',
    [userId, emailVerificationToken]
  )

  return emailVerificationToken
}

export default {
  authSignUp,
  authSignIn,
  authSignInWithGoogle,
  authVerifyEmail,
  authRefreshToken,
  authResendVerification
}
