import { jwtVerifyAccess } from "../utils/jwt.util.js";
import { sendUnauthorized } from "../utils/response.util.js";
import { prisma } from "../utils/prisma.util.js";

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

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.user_id) },
      select: { id: true, email: true, username: true, first_name: true, last_name: true, phone: true },
    });

    if (!user) {
      return sendUnauthorized(res, "User not found");
    }

    req.user = user;
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
      const user = await prisma.user.findUnique({
        where: { id: Number(decoded.user_id) },
        select: { id: true, email: true, username: true, first_name: true, last_name: true, phone: true },
      });
      if (user) req.user = user;
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
