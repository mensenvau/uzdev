import { query, queryOne } from '../../config/db.config.js'
import { hashPassword } from '../../utils/password.util.js'

/**
 * Get all users with pagination
 */
export async function userList({ page = 1, limit = 10, search = '' }) {
  const offset = (page - 1) * limit

  let sql = `
    SELECT id, email, username, is_email_verified, created_at
    FROM users
  `
  const params = []

  if (search) {
    sql += ' WHERE email LIKE ? OR username LIKE ?'
    params.push(`%${search}%`, `%${search}%`)
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const users = await query(sql, params)

  // Get total count
  let countSql = 'SELECT COUNT(*) as total FROM users'
  const countParams = []

  if (search) {
    countSql += ' WHERE email LIKE ? OR username LIKE ?'
    countParams.push(`%${search}%`, `%${search}%`)
  }

  const [{ total }] = await query(countSql, countParams)

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}

/**
 * Get user by ID
 */
export async function userGet(userId) {
  const user = await queryOne(
    `SELECT id, email, username, is_email_verified, created_at
     FROM users WHERE id = ?`,
    [userId]
  )

  if (!user) {
    throw new Error('User not found')
  }

  // Get user roles
  const roles = await query(
    `SELECT r.id, r.name
     FROM roles r
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ?`,
    [userId]
  )

  return { ...user, roles }
}

/**
 * Create new user
 */
export async function userCreate({ email, username, password }) {
  const passwordHash = await hashPassword(password)

  const result = await query(
    'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
    [email, username, passwordHash]
  )

  return await userGet(result.insertId)
}

/**
 * Update user
 */
export async function userUpdate(userId, { email, username, isEmailVerified }) {
  const updates = []
  const params = []

  if (email !== undefined) {
    updates.push('email = ?')
    params.push(email)
  }

  if (username !== undefined) {
    updates.push('username = ?')
    params.push(username)
  }

  if (isEmailVerified !== undefined) {
    updates.push('is_email_verified = ?')
    params.push(isEmailVerified)
  }

  if (updates.length === 0) {
    throw new Error('No fields to update')
  }

  params.push(userId)

  await query(
    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
    params
  )

  return await userGet(userId)
}

/**
 * Delete user
 */
export async function userDelete(userId) {
  const result = await query('DELETE FROM users WHERE id = ?', [userId])

  if (result.affectedRows === 0) {
    throw new Error('User not found')
  }

  return true
}

export default {
  userList,
  userGet,
  userCreate,
  userUpdate,
  userDelete
}
