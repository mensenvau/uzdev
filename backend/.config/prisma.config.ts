import { defineConfig } from "prisma/config";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env from root directory
config({ path: resolve(__dirname, "../../.env") });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
});
