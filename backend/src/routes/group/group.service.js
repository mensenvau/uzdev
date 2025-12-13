import { query, queryOne } from '../../config/db.config.js'

export async function groupList() {
  return await query('SELECT * FROM groups ORDER BY created_at DESC')
}

export async function groupGet(groupId) {
  const group = await queryOne('SELECT * FROM groups WHERE id = ?', [groupId])
  if (!group) throw new Error('Group not found')

  const users = await query(
    `SELECT u.id, u.email, u.username
     FROM users u
     JOIN group_users gu ON u.id = gu.user_id
     WHERE gu.group_id = ?`,
    [groupId]
  )

  return { ...group, users }
}

export async function groupCreate({ name, description }) {
  const result = await query(
    'INSERT INTO groups (name, description) VALUES (?, ?)',
    [name, description]
  )
  return await groupGet(result.insertId)
}

export async function groupUpdate(groupId, { name, description }) {
  await query(
    'UPDATE groups SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?',
    [name, description, groupId]
  )
  return await groupGet(groupId)
}

export async function groupDelete(groupId) {
  const result = await query('DELETE FROM groups WHERE id = ?', [groupId])
  if (result.affectedRows === 0) throw new Error('Group not found')
  return true
}

export async function groupAddUser(groupId, userId) {
  await query(
    'INSERT IGNORE INTO group_users (group_id, user_id) VALUES (?, ?)',
    [groupId, userId]
  )
  return true
}

export async function groupRemoveUser(groupId, userId) {
  await query(
    'DELETE FROM group_users WHERE group_id = ? AND user_id = ?',
    [groupId, userId]
  )
  return true
}

export default {
  groupList,
  groupGet,
  groupCreate,
  groupUpdate,
  groupDelete,
  groupAddUser,
  groupRemoveUser
}
