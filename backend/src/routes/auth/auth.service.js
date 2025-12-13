import { comparePassword, hashPassword } from '../../utils/password.util.js'
import { jwtGenerateAccess, jwtGenerateRefresh, jwtVerifyRefresh } from '../../utils/jwt.util.js'
import { queryMany, queryOne } from '../../utils/db.util.js'

export async function authSignUp(email, username, password) {
  const existingUser = await queryOne(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  )

  if (existingUser) {
    throw new Error('Email or username already exists')
  }

  const hashedPassword = await hashPassword(password)

  const result = await queryMany(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    [email, username, hashedPassword]
  )

  const userId = result.insertId
  const accessToken = jwtGenerateAccess({ userId })
  const refreshToken = jwtGenerateRefresh({ userId })

  return { accessToken, refreshToken, userId }
}

export async function authSignIn(login, password) {
  const user = await queryOne(
    'SELECT id, password FROM users WHERE email = ? OR username = ?',
    [login, login]
  )

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isPasswordValid = await comparePassword(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  const accessToken = jwtGenerateAccess({ userId: user.id })
  const refreshToken = jwtGenerateRefresh({ userId: user.id })

  return { accessToken, refreshToken, userId: user.id }
}

export async function authSignInWithGoogle(googleId, email, username) {
  let user = await queryOne(
    'SELECT id FROM users WHERE google_id = ?',
    [googleId]
  )

  if (!user) {
    const result = await queryMany(
      'INSERT INTO users (email, username, google_id) VALUES (?, ?, ?)',
      [email, username || email.split('@')[0], googleId]
    )
    user = { id: result.insertId }
  }

  const accessToken = jwtGenerateAccess({ userId: user.id })
  const refreshToken = jwtGenerateRefresh({ userId: user.id })

  return { accessToken, refreshToken, userId: user.id }
}

export async function authRefreshToken(refreshToken) {
  const decoded = jwtVerifyRefresh(refreshToken)

  if (!decoded) {
    throw new Error('Invalid refresh token')
  }

  const user = await queryOne(
    'SELECT id FROM users WHERE id = ?',
    [decoded.userId]
  )

  if (!user) {
    throw new Error('User not found')
  }

  const accessToken = jwtGenerateAccess({ userId: user.id })
  const newRefreshToken = jwtGenerateRefresh({ userId: user.id })

  return { accessToken, refreshToken: newRefreshToken }
}
