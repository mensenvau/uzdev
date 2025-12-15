import dotenv from "dotenv";
import path from "path";

const backend_env_path = path.resolve(process.cwd(), ".env");
const root_env_path = path.resolve(process.cwd(), "..", ".env");

// Load backend/.env first, then fall back to repo root .env
dotenv.config({ path: backend_env_path });
dotenv.config({ path: root_env_path });

// Nothing to export; importing this file initializes environment variables.
