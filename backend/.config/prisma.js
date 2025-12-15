import { defineConfig, env } from "prisma/config";
import "dotenv/config";
import "../src/utils/env.utils.js";

export default defineConfig({
  schema: "../prisma/schema.prisma",
  migrations: {
    path: "../prisma/migrations",
    seed: "node ../prisma/seed/index.js",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
