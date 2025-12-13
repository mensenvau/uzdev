import mysql from 'mysql2/promise'

export const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'core_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export async function queryMany(sql, params = []) {
  const [rows] = await poolConnection.execute(sql, params)
  return rows
}

export async function queryOne(sql, params = []) {
  const [rows] = await poolConnection.execute(sql, params)
  return rows[0] || null
}

export default {
  poolConnection,
  queryMany,
  queryOne
}
