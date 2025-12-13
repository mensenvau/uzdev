import { verifyAccessToken } from '../utils/jwt.util.js'
import { sendUnauthorized } from '../utils/response.util.js'
import { query } from '../config/db.config.js'

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export async function authMiddleware(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendUnauthorized(res, 'No token provided')
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyAccessToken(token)

    if (!decoded) {
      return sendUnauthorized(res, 'Invalid or expired token')
    }

    // Get user from database
    const user = await query(
      'SELECT id, email, username, is_email_verified FROM users WHERE id = ?',
      [decoded.userId]
    )

    if (user.length === 0) {
      return sendUnauthorized(res, 'User not found')
    }

    // Attach user to request
    req.user = user[0]

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return sendUnauthorized(res, 'Authentication failed')
  }
}

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't require authentication
 */
export async function optionalAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next()
    }

    const token = authHeader.substring(7)
    const decoded = verifyAccessToken(token)

    if (decoded) {
      const user = await query(
        'SELECT id, email, username, is_email_verified FROM users WHERE id = ?',
        [decoded.userId]
      )

      if (user.length > 0) {
        req.user = user[0]
      }
    }

    next()
  } catch (error) {
    // Silent fail for optional auth
    next()
  }
}

export default {
  authMiddleware,
  optionalAuthMiddleware
}
