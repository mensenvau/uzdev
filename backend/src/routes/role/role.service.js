import { query, queryOne, transaction } from '../../config/db.config.js'

export async function roleList() {
  return await query('SELECT * FROM roles ORDER BY created_at DESC')
}

export async function roleGet(roleId) {
  const role = await queryOne('SELECT * FROM roles WHERE id = ?', [roleId])
  if (!role) throw new Error('Role not found')

  const policies = await query(
    `SELECT p.id, p.name, p.description
     FROM policies p
     JOIN role_policies rp ON p.id = rp.policy_id
     WHERE rp.role_id = ?`,
    [roleId]
  )

  return { ...role, policies }
}

export async function roleCreate({ name, description }) {
  const result = await query(
    'INSERT INTO roles (name, description) VALUES (?, ?)',
    [name, description]
  )
  return await roleGet(result.insertId)
}

export async function roleUpdate(roleId, { name, description }) {
  await query(
    'UPDATE roles SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?',
    [name, description, roleId]
  )
  return await roleGet(roleId)
}

export async function roleDelete(roleId) {
  const result = await query('DELETE FROM roles WHERE id = ?', [roleId])
  if (result.affectedRows === 0) throw new Error('Role not found')
  return true
}

export async function roleAssignToUser(userId, roleId) {
  await query(
    'INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)',
    [userId, roleId]
  )
  return true
}

export async function roleRemoveFromUser(userId, roleId) {
  await query(
    'DELETE FROM user_roles WHERE user_id = ? AND role_id = ?',
    [userId, roleId]
  )
  return true
}

export default {
  roleList,
  roleGet,
  roleCreate,
  roleUpdate,
  roleDelete,
  roleAssignToUser,
  roleRemoveFromUser
}
