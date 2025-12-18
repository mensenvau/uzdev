/**
 * Database Utility - MySQL2 Connection Pool
 *
 * Centralized database access with connection pooling for optimal performance.
 * All database operations should use this utility.
 *
 * Features:
 * - Connection pooling for efficiency
 * - Prepared statements for SQL injection protection
 * - Transaction support
 * - Error handling
 *
 * Usage:
 *   const { query, transaction } = require('./utils/db');
 *
 *   // Simple query
 *   const users = await query('SELECT * FROM system_users WHERE id = ?', [userId]);
 *
 *   // Transaction
 *   await transaction(async (connection) => {
 *     await connection.execute('INSERT INTO ...', [params]);
 *     await connection.execute('UPDATE ...', [params]);
 *   });
 */

require('./env.utils');
const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'core_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

/**
 * Execute a SQL query with parameters
 * @param {string} sql - SQL query with placeholders (?)
 * @param {Array} params - Parameters for prepared statement
 * @returns {Promise<Array>} Query results
 */
async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
}

/**
 * Execute query and return first row
 * @param {string} sql - SQL query
 * @param {Array} params - Parameters
 * @returns {Promise<Object|null>} First row or null
 */
async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Execute multiple queries in a transaction
 * @param {Function} callback - Async function that receives connection
 * @returns {Promise} Transaction result
 *
 * @example
 * await transaction(async (conn) => {
 *   await conn.execute('INSERT INTO ...', [params]);
 *   await conn.execute('UPDATE ...', [params]);
 * });
 */
async function transaction(callback) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Test database connection
 * @returns {Promise<boolean>} True if connected
 */
async function testConnection() {
  try {
    const [rows] = await pool.execute('SELECT 1 as test');
    return rows[0].test === 1;
  } catch (error) {
    console.error('Database connection test failed:', error.message);
    return false;
  }
}

/**
 * Close all connections in the pool
 * Call this when shutting down the application
 */
async function closePool() {
  await pool.end();
}

// Export utilities
module.exports = {
  pool,
  query,
  queryOne,
  transaction,
  testConnection,
  closePool
};
