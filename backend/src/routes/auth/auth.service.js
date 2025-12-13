import { queryMany, queryOne, poolConnection } from '../../utils/db.util.js'
import { hashPassword, comparePassword } from '../../utils/password.util.js'
import {
  jwtGenerateAccess,
  jwtGenerateRefresh,
  jwtGenerateEmailVerify,
  jwtVerifyEmailVerify,
  jwtVerifyRefresh
} from '../../utils/jwt.util.js'

export async function authSignUp({ email, username, password }) {
  const existingUser = await queryOne(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  )

  if (existingUser) {
    throw new Error('Email or username already exists')
  }

  const passwordHash = await hashPassword(password)

  const conn = await poolConnection.getConnection()
  try {
    await conn.beginTransaction()

    const [userResult] = await conn.execute(
      'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
      [email, username, passwordHash]
    )

    const userId = userResult.insertId

    const [roleResult] = await conn.execute(
      'SELECT id FROM roles WHERE name = ?',
      ['user']
    )

    if (roleResult.length > 0) {
      await conn.execute(
        'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
        [userId, roleResult[0].id]
      )
    }

    await conn.commit()

    const user = await queryOne(
      'SELECT id, email, username, is_email_verified, created_at FROM users WHERE id = ?',
      [userId]
    )

    const accessToken = jwtGenerateAccess({ userId: user.id })
    const refreshToken = jwtGenerateRefresh({ userId: user.id })
    const emailVerificationToken = jwtGenerateEmailVerify(user.id)

    await queryMany(
      'INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))',
      [user.id, emailVerificationToken]
    )

    return {
      user,
      accessToken,
      refreshToken,
      emailVerificationToken
    }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function authSignIn({ login, password }) {
  const user = await queryOne(
    'SELECT id, email, username, password_hash, is_email_verified FROM users WHERE email = ? OR username = ?',
    [login, login]
  )

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isPasswordValid = await comparePassword(password, user.password_hash)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  const accessToken = jwtGenerateAccess({ userId: user.id })
  const refreshToken = jwtGenerateRefresh({ userId: user.id })

  delete user.password_hash

  return {
    user,
    accessToken,
    refreshToken
  }
}

export async function authSignInWithGoogle({ googleId, email, username }) {
  let user = await queryOne(
    'SELECT id, email, username, is_email_verified FROM users WHERE google_id = ?',
    [googleId]
  )

  if (!user) {
    const conn = await poolConnection.getConnection()
    try {
      await conn.beginTransaction()

      const [userResult] = await conn.execute(
        'INSERT INTO users (email, username, google_id, is_email_verified) VALUES (?, ?, ?, TRUE)',
        [email, username || email.split('@')[0], googleId]
      )

      const userId = userResult.insertId

      const [roleResult] = await conn.execute(
        'SELECT id FROM roles WHERE name = ?',
        ['user']
      )

      if (roleResult.length > 0) {
        await conn.execute(
          'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
          [userId, roleResult[0].id]
        )
      }

      await conn.commit()

      user = await queryOne(
        'SELECT id, email, username, is_email_verified FROM users WHERE id = ?',
        [userId]
      )
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }

  const accessToken = jwtGenerateAccess({ userId: user.id })
  const refreshToken = jwtGenerateRefresh({ userId: user.id })

  return {
    user,
    accessToken,
    refreshToken
  }
}

export async function authVerifyEmail(token) {
  const decoded = jwtVerifyEmailVerify(token)

  if (!decoded) {
    throw new Error('Invalid or expired verification token')
  }

  const tokenRecord = await queryOne(
    'SELECT id, user_id FROM email_verification_tokens WHERE token = ? AND expires_at > NOW()',
    [token]
  )

  if (!tokenRecord) {
    throw new Error('Invalid or expired verification token')
  }

  await queryMany(
    'UPDATE users SET is_email_verified = TRUE WHERE id = ?',
    [tokenRecord.user_id]
  )

  await queryMany(
    'DELETE FROM email_verification_tokens WHERE id = ?',
    [tokenRecord.id]
  )

  return true
}

export async function authRefreshToken(refreshToken) {
  const decoded = jwtVerifyRefresh(refreshToken)

  if (!decoded) {
    throw new Error('Invalid or expired refresh token')
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

  return {
    accessToken,
    refreshToken: newRefreshToken
  }
}

export async function authResendVerification(userId) {
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

  await queryMany(
    'DELETE FROM email_verification_tokens WHERE user_id = ?',
    [userId]
  )

  const emailVerificationToken = jwtGenerateEmailVerify(userId)

  await queryMany(
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
