/**
 * Authentication Middleware
 * Verifies JWT tokens and loads user data
 */

const { verifyAccessToken } = require("../utils/jwt.util");
const { sendUnauthorized } = require("../utils/response.util");
const { queryMany } = require("../utils/db");

async function authMiddleware(req, res, next) {
  try {
    const auth_header = req.headers.authorization;
    if (!auth_header || !auth_header.startsWith("Bearer ")) {
      return sendUnauthorized(res, "No token provided");
    }

    const token = auth_header.substring(7);

    let decoded_token;
    try {
      decoded_token = verifyAccessToken(token);
    } catch (error) {
      return sendUnauthorized(res, "Invalid or expired token");
    }

    const users = await queryMany("SELECT id, email, username, first_name, last_name, phone FROM system_users WHERE id = ?", [decoded_token.user_id]);

    if (!users || users.length === 0) {
      return sendUnauthorized(res, "User not found");
    }

    req.user = users[0];
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return sendUnauthorized(res, "Authentication failed");
  }
}

async function optionalAuthMiddleware(req, res, next) {
  try {
    const auth_header = req.headers.authorization;
    if (!auth_header || !auth_header.startsWith("Bearer ")) {
      return next();
    }

    const token = auth_header.substring(7);

    let decoded_token;
    try {
      decoded_token = verifyAccessToken(token);
    } catch (error) {
      return next();
    }

    const users = await queryMany("SELECT id, email, username, first_name, last_name, phone FROM system_users WHERE id = ?", [decoded_token.user_id]);

    if (users && users.length > 0) {
      req.user = users[0];
    }

    next();
  } catch (error) {
    next();
  }
}

module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
};
