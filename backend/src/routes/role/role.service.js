import { queryMany, queryOne } from '../../utils/db.util.js'

export async function roleList({ limit = 10, page = 1, search = '' }) {
  const offset = (page - 1) * limit
  let sql = 'SELECT id, name, description, created_at FROM roles'
  const params = []

  if (search) {
    sql += ' WHERE name LIKE ? OR description LIKE ?'
    params.push(`%${search}%`, `%${search}%`)
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const roles = await queryMany(sql, params)

  const countSql = search
    ? 'SELECT COUNT(*) as total FROM roles WHERE name LIKE ? OR description LIKE ?'
    : 'SELECT COUNT(*) as total FROM roles'
  const countParams = search ? [`%${search}%`, `%${search}%`] : []
  const [{ total }] = await queryMany(countSql, countParams)

  return { limit, page, total, roles }
}

export async function roleGet(id) {
  const role = await queryOne(
    'SELECT id, name, description, created_at FROM roles WHERE id = ?',
    [id]
  )

  if (!role) throw new Error('Role not found')

  const policies = await queryMany(
    `SELECT p.id, p.resource, p.action FROM policies p
     JOIN role_policies rp ON p.id = rp.policy_id
     WHERE rp.role_id = ?`,
    [id]
  )

  return { ...role, policies }
}

export async function roleCreate(name, description) {
  const result = await queryMany(
    'INSERT INTO roles (name, description) VALUES (?, ?)',
    [name, description || null]
  )
  return await roleGet(result.insertId)
}

export async function roleUpdate(id, { name, description }) {
  const updates = []
  const params = []

  if (name) {
    updates.push('name = ?')
    params.push(name)
  }

  if (description !== undefined) {
    updates.push('description = ?')
    params.push(description)
  }

  if (updates.length === 0) throw new Error('No fields to update')

  params.push(id)
  await queryMany(`UPDATE roles SET ${updates.join(', ')} WHERE id = ?`, params)
  return await roleGet(id)
}

export async function roleDelete(id) {
  const result = await queryMany('DELETE FROM roles WHERE id = ?', [id])
  if (result.affectedRows === 0) throw new Error('Role not found')
  return true
}

export async function roleAssignToUser(userId, roleId) {
  await queryMany(
    'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
    [userId, roleId]
  )
  return true
}

export async function roleRemoveFromUser(userId, roleId) {
  const result = await queryMany(
    'DELETE FROM user_roles WHERE user_id = ? AND role_id = ?',
    [userId, roleId]
  )
  if (result.affectedRows === 0) throw new Error('Role assignment not found')
  return true
}
