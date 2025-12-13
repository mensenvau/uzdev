import { hashPassword } from '../../utils/password.util.js'
import { queryOne, queryMany } from '../../utils/db.util.js'

export async function createUser(email, username, password) {
  const hashedPassword = await hashPassword(password)
  const result = await queryMany(
    'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
    [email, username, hashedPassword]
  )
  return result.insertId
}

export async function findUserById(id) {
  return await queryOne(
    'SELECT id, email, username, created_at FROM users WHERE id = ?',
    [id]
  )
}

export async function findAllUsers({ page = 1, limit = 10, search = '' }) {
  const offset = (page - 1) * limit

  let sql = 'SELECT id, email, username, created_at FROM users'
  const params = []

  if (search) {
    sql += ' WHERE email LIKE ? OR username LIKE ?'
    params.push(`%${search}%`, `%${search}%`)
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const users = await queryMany(sql, params)

  const countSql = search
    ? 'SELECT COUNT(*) as total FROM users WHERE email LIKE ? OR username LIKE ?'
    : 'SELECT COUNT(*) as total FROM users'
  const countParams = search ? [`%${search}%`, `%${search}%`] : []
  const [{ total }] = await queryMany(countSql, countParams)

  return { users, total, page, limit }
}

export async function updateUser(id, { email, username }) {
  const updates = []
  const params = []

  if (email) {
    updates.push('email = ?')
    params.push(email)
  }

  if (username) {
    updates.push('username = ?')
    params.push(username)
  }

  if (updates.length === 0) return null

  params.push(id)
  await queryMany(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params)
  return await findUserById(id)
}

export async function deleteUser(id) {
  const result = await queryMany('DELETE FROM users WHERE id = ?', [id])
  return result.affectedRows > 0
}

export default {
  createUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser
}
