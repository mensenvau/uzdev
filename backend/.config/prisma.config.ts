import "../src/utils/env.utils";
import { defineConfig } from "prisma/config";

declare var process: { env: { DATABASE_URL: string } };

export default defineConfig({
  schema: "../prisma",
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
  migrations: {
    seed: "node ./prisma/seeds/index.js",
  },
});
