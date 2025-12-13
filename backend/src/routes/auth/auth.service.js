import { comparePassword, hashPassword } from '../../utils/password.util.js'
import { jwtGenerateAccess, jwtGenerateRefresh, jwtVerifyRefresh } from '../../utils/jwt.util.js'
import { queryMany, queryOne } from '../../utils/db.util.js'

export async function authSignUp(email, username, password) {
  const existing = await queryOne(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  )

  if (existing) throw new Error('Email or username already exists')

  const hashedPassword = await hashPassword(password)

  const result = await queryMany(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    [email, username, hashedPassword]
  )

  const userId = result.insertId

  const roleResult = await queryMany('SELECT id FROM roles WHERE name = ?', ['user'])

  if (roleResult.length > 0) {
    await queryMany(
      'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
      [userId, roleResult[0].id]
    )
  }

  const user = await queryOne(
    'SELECT id, email, username, created_at FROM users WHERE id = ?',
    [userId]
  )

  return {
    accessToken: jwtGenerateAccess({ userId }),
    refreshToken: jwtGenerateRefresh({ userId }),
    user
  }
}

export async function authSignIn(login, password) {
  const user = await queryOne(
    'SELECT id, email, username, password FROM users WHERE email = ? OR username = ?',
    [login, login]
  )

  if (!user) throw new Error('Invalid credentials')

  const valid = await comparePassword(password, user.password)
  if (!valid) throw new Error('Invalid credentials')

  delete user.password

  return {
    accessToken: jwtGenerateAccess({ userId: user.id }),
    refreshToken: jwtGenerateRefresh({ userId: user.id }),
    user
  }
}

export async function authSignInWithGoogle(googleId, email, username) {
  let user = await queryOne(
    'SELECT id, email, username FROM users WHERE google_id = ?',
    [googleId]
  )

  if (!user) {
    const result = await queryMany(
      'INSERT INTO users (email, username, google_id) VALUES (?, ?, ?)',
      [email, username || email.split('@')[0], googleId]
    )

    const userId = result.insertId
    const roleResult = await queryMany('SELECT id FROM roles WHERE name = ?', ['user'])

    if (roleResult.length > 0) {
      await queryMany(
        'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
        [userId, roleResult[0].id]
      )
    }

    user = await queryOne(
      'SELECT id, email, username FROM users WHERE id = ?',
      [userId]
    )
  }

  return {
    accessToken: jwtGenerateAccess({ userId: user.id }),
    refreshToken: jwtGenerateRefresh({ userId: user.id }),
    user
  }
}

export async function authRefreshToken(refreshToken) {
  const decoded = jwtVerifyRefresh(refreshToken)
  if (!decoded) throw new Error('Invalid refresh token')

  const user = await queryOne('SELECT id FROM users WHERE id = ?', [decoded.userId])
  if (!user) throw new Error('User not found')

  return {
    accessToken: jwtGenerateAccess({ userId: user.id }),
    refreshToken: jwtGenerateRefresh({ userId: user.id })
  }
}
