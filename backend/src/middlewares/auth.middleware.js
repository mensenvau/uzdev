/**
 * Authentication Middleware
 * Verifies JWT tokens and loads user data
 */

const { verifyAccessToken } = require('../utils/jwt.util');
const { sendUnauthorized } = require('../utils/response.util');
const { query } = require('../utils/db');

/**
 * Required authentication middleware
 * Requires valid JWT token in Authorization header
 */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendUnauthorized(res, 'No token provided');
    }

    const token = authHeader.substring(7);

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return sendUnauthorized(res, 'Invalid or expired token');
    }

    // Get user from database
    const users = await query(
      'SELECT id, email, username, first_name, last_name, phone FROM system_users WHERE id = ?',
      [decoded.user_id]
    );

    if (!users || users.length === 0) {
      return sendUnauthorized(res, 'User not found');
    }

    req.user = users[0];
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return sendUnauthorized(res, 'Authentication failed');
  }
}

/**
 * Optional authentication middleware
 * Loads user if token is provided, but doesn't require it
 */
async function optionalAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return next(); // Invalid token, continue without user
    }

    // Get user from database
    const users = await query(
      'SELECT id, email, username, first_name, last_name, phone FROM system_users WHERE id = ?',
      [decoded.user_id]
    );

    if (users && users.length > 0) {
      req.user = users[0];
    }

    next();
  } catch (error) {
    next(); // Error loading user, continue without user
  }
}

module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
};
