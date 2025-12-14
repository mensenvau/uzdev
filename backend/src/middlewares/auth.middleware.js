import { jwtVerifyAccess } from "../utils/jwt.util.js";
import { sendUnauthorized } from "../utils/response.util.js";
import { queryMany } from "../utils/db.util.js";

export async function authMiddleware(req, res, next) {
  try {
    const auth_header = req.headers.authorization;
    if (!auth_header || !auth_header.startsWith("Bearer ")) {
      return sendUnauthorized(res, "No token provided");
    }

    const token = auth_header.substring(7);
    const decoded = jwtVerifyAccess(token);
    if (!decoded) {
      return sendUnauthorized(res, "Invalid or expired token");
    }

    const user_rows = await queryMany("SELECT id, email, username, first_name, last_name, phone FROM system_users WHERE id = ?", [decoded.user_id]);
    if (user_rows.length === 0) {
      return sendUnauthorized(res, "User not found");
    }

    req.user = user_rows[0];
    next();
  } catch (error) {
    console.log(error);
    return sendUnauthorized(res, "Authentication failed");
  }
}

export async function optionalAuthMiddleware(req, res, next) {
  try {
    const auth_header = req.headers.authorization;
    if (!auth_header || !auth_header.startsWith("Bearer ")) {
      return next();
    }

    const token = auth_header.substring(7);
    const decoded = jwtVerifyAccess(token);

    if (decoded) {
      const user_rows = await queryMany("SELECT id, email, username, first_name, last_name, phone, is_email_verified FROM system_users WHERE id = ?", [decoded.user_id]);
      if (user_rows.length > 0) {
        req.user = user_rows[0];
      }
    }
    next();
  } catch (error) {
    next();
  }
}

export default {
  authMiddleware,
  optionalAuthMiddleware,
};
