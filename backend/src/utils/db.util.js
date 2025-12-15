/**
 * Database Utility - Centralized Prisma Client
 *
 * This is the SINGLE SOURCE OF TRUTH for Prisma Client in the application.
 * Always import { prisma } from this file - never create new PrismaClient instances.
 *
 * Schema Structure:
 * - Schemas are located in /prisma/schemas/
 * - Each module has its own schema file (system.prisma, dss.prisma, etc.)
 * - Main schema.prisma references all module schemas
 *
 * Usage:
 *   import { prisma } from './utils/db.util.js';
 *   const users = await prisma.user.findMany();
 *
 * Transactions:
 *   import { withTransaction } from './utils/db.util.js';
 *   await withTransaction(async (tx) => {
 *     await tx.user.create({ ... });
 *     await tx.role.create({ ... });
 *   });
 */

import "./env.utils.js";
import { PrismaClient } from "@prisma/client";

/**
 * Ensures DATABASE_URL is set from individual DB_* environment variables
 * This allows using either DATABASE_URL directly or separate DB_HOST, DB_PORT, etc.
 */
function ensureDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "3306";
  const user = process.env.DB_USER || "root";
  const password = encodeURIComponent(process.env.DB_PASSWORD || "");
  const database = process.env.DB_NAME || "core_app";
  const url = `mysql://${user}:${password}@${host}:${port}/${database}`;
  process.env.DATABASE_URL = url;
  return url;
}

ensureDatabaseUrl();

/**
 * Singleton Prisma Client Instance
 * Configured with appropriate logging for development/production
 */
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
});

/**
 * Transaction Helper
 * Wraps Prisma transactions for cleaner syntax
 *
 * @param {Function} callback - Async function that receives transaction client
 * @returns {Promise} Result of the transaction
 */
export async function withTransaction(callback) {
  return prisma.$transaction(async (tx) => callback(tx));
}

// Default export for convenience
export default {
  prisma,
  withTransaction,
};
