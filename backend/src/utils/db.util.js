import "./env.utils.js";
import { PrismaClient } from "@prisma/client";

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

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
});

export async function withTransaction(callback) {
  return prisma.$transaction(async (tx) => callback(tx));
}

export default {
  prisma,
  withTransaction,
};
