import { queryOne, queryMany } from '../../utils/db.util.js'

export async function findAllGroups() {
  return await queryMany('SELECT * FROM groups ORDER BY created_at DESC')
}

export async function findGroupById(id) {
  const group = await queryOne('SELECT * FROM groups WHERE id = ?', [id])
  if (!group) return null

  const users = await queryMany(
    `SELECT u.id, u.email, u.username
     FROM users u
     JOIN group_users gu ON u.id = gu.user_id
     WHERE gu.group_id = ?`,
    [id]
  )

  return { ...group, users }
}

export async function createGroup(name, description) {
  const result = await queryMany(
    'INSERT INTO groups (name, description) VALUES (?, ?)',
    [name, description]
  )
  return result.insertId
}

export async function updateGroup(id, { name, description }) {
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
  await queryMany(`UPDATE groups SET ${updates.join(', ')} WHERE id = ?`, params)
  return await findGroupById(id)
}

export async function deleteGroup(id) {
  const result = await queryMany('DELETE FROM groups WHERE id = ?', [id])
  return result.affectedRows > 0
}

export async function addUserToGroup(groupId, userId) {
  await queryMany(
    'INSERT IGNORE INTO group_users (group_id, user_id) VALUES (?, ?)',
    [groupId, userId]
  )
  return true
}

export async function removeUserFromGroup(groupId, userId) {
  await queryMany(
    'DELETE FROM group_users WHERE group_id = ? AND user_id = ?',
    [groupId, userId]
  )
  return true
}

export default {
  findAllGroups,
  findGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup
}
