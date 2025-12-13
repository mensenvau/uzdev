import { hashPassword } from '../../utils/password.util.js'
import { queryMany, queryOne } from '../../utils/db.util.js'

export async function userList({ limit = 10, page = 1, search = '' }) {
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

  return { limit, page, total, users }
}

export async function userGet(id) {
  const user = await queryOne(
    'SELECT id, email, username, created_at FROM users WHERE id = ?',
    [id]
  )

  if (!user) throw new Error('User not found')

  const roles = await queryMany(
    `SELECT r.id, r.name FROM roles r
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ?`,
    [id]
  )

  return { ...user, roles }
}

export async function userCreate(email, password, username) {
  const hashedPassword = await hashPassword(password)
  const result = await queryMany(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    [email, username, hashedPassword]
  )
  return await userGet(result.insertId)
}

export async function userUpdate(id, { email, username }) {
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

  if (updates.length === 0) throw new Error('No fields to update')

  params.push(id)
  await queryMany(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params)
  return await userGet(id)
}

export async function userDelete(id) {
  const result = await queryMany('DELETE FROM users WHERE id = ?', [id])
  if (result.affectedRows === 0) throw new Error('User not found')
  return true
}
