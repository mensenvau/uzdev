import { queryOne, queryMany } from '../../utils/db.util.js'

export async function findAllRoles() {
  return await queryMany('SELECT * FROM roles ORDER BY created_at DESC')
}

export async function findRoleById(id) {
  const role = await queryOne('SELECT * FROM roles WHERE id = ?', [id])
  if (!role) return null

  const policies = await queryMany(
    `SELECT p.id, p.name, p.description
     FROM policies p
     JOIN role_policies rp ON p.id = rp.policy_id
     WHERE rp.role_id = ?`,
    [id]
  )

  return { ...role, policies }
}

export async function createRole(name, description) {
  const result = await queryMany(
    'INSERT INTO roles (name, description) VALUES (?, ?)',
    [name, description]
  )
  return result.insertId
}

export async function updateRole(id, { name, description }) {
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

  if (updates.length === 0) return null

  params.push(id)
  await queryMany(`UPDATE roles SET ${updates.join(', ')} WHERE id = ?`, params)
  return await findRoleById(id)
}

export async function deleteRole(id) {
  const result = await queryMany('DELETE FROM roles WHERE id = ?', [id])
  return result.affectedRows > 0
}

export async function assignRoleToUser(userId, roleId) {
  await queryMany(
    'INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)',
    [userId, roleId]
  )
  return true
}

export async function removeRoleFromUser(userId, roleId) {
  await queryMany(
    'DELETE FROM user_roles WHERE user_id = ? AND role_id = ?',
    [userId, roleId]
  )
  return true
}

export default {
  findAllRoles,
  findRoleById,
  createRole,
  updateRole,
  deleteRole,
  assignRoleToUser,
  removeRoleFromUser
}
