import "dotenv/config";
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { getDirname } from "../utils/path.util.js";

const db_host = process.env.DB_HOST || "localhost";
const db_port = Number(process.env.DB_PORT || 3306);
const db_user = process.env.DB_USER || "root";
const db_password = process.env.DB_PASSWORD || "";
const db_name = process.env.DB_NAME || "core_app";

const loadSql = (filename) => {
  const sqlPath = path.join(getDirname(import.meta), filename);
  const raw = fs.readFileSync(sqlPath, "utf8");
  // Replace default db name with env-provided name to keep scripts reusable
  return raw.replace(/core_app/g, db_name);
};

async function resetDatabase() {
  const initSql = loadSql("init.sql");
  const seedSql = loadSql("seed.sql");

  const connection = await mysql.createConnection({
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    multipleStatements: true,
  });

  // init.sql already handles drop/create/use
  await connection.query(initSql);
  await connection.query(seedSql);

  await connection.end();
  // eslint-disable-next-line no-console
  console.log(`Database reset completed for ${db_name} using host ${db_host}:${db_port}.`);
}

resetDatabase().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Database reset failed:", err);
  process.exit(1);
});
