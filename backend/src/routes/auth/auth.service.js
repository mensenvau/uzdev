import { hashPassword, comparePassword } from '../../utils/password.util.js'
import { jwtGenerateAccess, jwtGenerateRefresh, jwtVerifyRefresh } from '../../utils/jwt.util.js'
import { queryOne, queryMany } from '../../utils/db.util.js'

export async function createUser(email, username, password) {
  const hashedPassword = await hashPassword(password)
  const result = await queryMany(
    'INSERT INTO users (email, username, password, created_at) VALUES (?, ?, ?, NOW())',
    [email, username, hashedPassword]
  )
  return result.insertId
}

export async function findUserByEmail(email) {
  return await queryOne('SELECT * FROM users WHERE email = ?', [email])
}

export async function findUserById(id) {
  return await queryOne('SELECT id, email, username, is_email_verified, created_at FROM users WHERE id = ?', [id])
}

export async function verifyPassword(password, hashedPassword) {
  return await comparePassword(password, hashedPassword)
}

export async function generateTokens(userId) {
  const accessToken = jwtGenerateAccess({ userId })
  const refreshToken = jwtGenerateRefresh({ userId })
  await queryMany(
    'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY), NOW())',
    [userId, refreshToken]
  )
  return { accessToken, refreshToken }
}

export async function verifyRefreshToken(token) {
  const decoded = jwtVerifyRefresh(token)
  if (!decoded) return null

  const tokenRecord = await queryOne(
    'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW() AND revoked = 0',
    [token]
  )

  if (!tokenRecord) return null
  return decoded.userId
}

export async function revokeRefreshToken(token) {
  await queryMany('UPDATE refresh_tokens SET revoked = 1 WHERE token = ?', [token])
}

export async function findOrCreateGoogleUser(googleId, email, name) {
  let user = await queryOne('SELECT * FROM users WHERE google_id = ?', [googleId])

  if (!user) {
    user = await queryOne('SELECT * FROM users WHERE email = ?', [email])

    if (user) {
      await queryMany('UPDATE users SET google_id = ? WHERE id = ?', [googleId, user.id])
    } else {
      const result = await queryMany(
        'INSERT INTO users (email, username, google_id, is_email_verified, created_at) VALUES (?, ?, ?, 1, NOW())',
        [email, name || email.split('@')[0], googleId]
      )
      user = await findUserById(result.insertId)
    }
  }

  return user
}

export default {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
  generateTokens,
  verifyRefreshToken,
  revokeRefreshToken,
  findOrCreateGoogleUser
}
