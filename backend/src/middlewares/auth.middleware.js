import { jwtVerifyAccess } from '../utils/jwt.util.js'
import { sendUnauthorized } from '../utils/response.util.js'
import { queryMany } from '../utils/db.util.js'

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendUnauthorized(res, 'No token provided')
    }

    const token = authHeader.substring(7)
    const decoded = jwtVerifyAccess(token)

    if (!decoded) {
      return sendUnauthorized(res, 'Invalid or expired token')
    }

    const user = await queryMany(
      'SELECT id, email, username, is_email_verified FROM users WHERE id = ?',
      [decoded.userId]
    )

    if (user.length === 0) {
      return sendUnauthorized(res, 'User not found')
    }

    req.user = user[0]
    next()
  } catch (error) {
    return sendUnauthorized(res, 'Authentication failed')
  }
}

export async function optionalAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next()
    }

    const token = authHeader.substring(7)
    const decoded = jwtVerifyAccess(token)

    if (decoded) {
      const user = await queryMany(
        'SELECT id, email, username, is_email_verified FROM users WHERE id = ?',
        [decoded.userId]
      )

      if (user.length > 0) {
        req.user = user[0]
      }
    }

    next()
  } catch (error) {
    next()
  }
}

export default {
  authMiddleware,
  optionalAuthMiddleware
}
