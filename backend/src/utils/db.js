require("./env.utils");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "core_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

async function queryMany(sql, params = []) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  }
}

async function queryOne(sql, params = []) {
  const rows = await queryMany(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 as test");
    return rows[0].test === 1;
  } catch (error) {
    console.error("Database connection test failed:", error.message);
    return false;
  }
}

async function closePool() {
  await pool.end();
}

module.exports = {
  pool,
  queryMany,
  queryOne,
  testConnection,
  closePool,
};
