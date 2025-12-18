import "./env.utils.js";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

/**
 * Resolve DATABASE_URL for Prisma v7:
 * - Prefer explicit DATABASE_URL
 * - Otherwise build from DB_* pieces
 */
function resolveDatabaseUrl() {
  const explicitUrl = process.env.DATABASE_URL?.trim();
  if (explicitUrl) return explicitUrl;

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (DB_HOST && DB_USER && DB_NAME) {
    const port = DB_PORT || "3306";
    const password = DB_PASSWORD ? `:${encodeURIComponent(DB_PASSWORD)}` : "";
    return `mysql://${DB_USER}${password}@${DB_HOST}:${port}/${DB_NAME}`;
  }

  throw new Error("DATABASE_URL is not set and DB_* env variables are incomplete. " + "Set DATABASE_URL or DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME.");
}

const databaseUrl = resolveDatabaseUrl();
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

const adapter = new PrismaMariaDb({
  url: databaseUrl,
  logQueries: process.env.NODE_ENV === "development",
});

export const prisma = new PrismaClient({ adapter });

export default prisma;
