import mysql from 'mysql2/promise'
import { envConfig } from './env.config.js'

// Create connection pool
const pool = mysql.createPool({
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  user: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  waitForConnections: true,
  connectionLimit: envConfig.DB_CONNECTION_LIMIT,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
})

/**
 * Execute a SQL query
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
export async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params)
    return rows
  } catch (error) {
    console.error('Database query error:', error.message)
    throw error
  }
}

/**
 * Execute multiple queries in a transaction
 * @param {Function} callback - Async function that receives connection
 * @returns {Promise} Transaction result
 */
export async function transaction(callback) {
  const connection = await pool.getConnection()

  try {
    await connection.beginTransaction()
    const result = await callback(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    console.error('Transaction error:', error.message)
    throw error
  } finally {
    connection.release()
  }
}

/**
 * Get a single row
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Object|null>} Single row or null
 */
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params)
  return rows.length > 0 ? rows[0] : null
}

/**
 * Test database connection
 * @returns {Promise<boolean>}
 */
export async function testConnection() {
  try {
    await pool.query('SELECT 1')
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    return false
  }
}

/**
 * Close database connection pool
 */
export async function closePool() {
  await pool.end()
  console.log('Database connection pool closed')
}

// Export pool for direct access if needed
export { pool }

export default {
  query,
  queryOne,
  transaction,
  testConnection,
  closePool,
  pool
}
