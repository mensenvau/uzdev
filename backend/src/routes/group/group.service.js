import { queryMany, queryOne } from '../../utils/db.util.js'

export async function groupList({ limit = 10, page = 1, search = '' }) {
  const offset = (page - 1) * limit
  let sql = 'SELECT id, name, description, created_at FROM groups'
  const params = []

  if (search) {
    sql += ' WHERE name LIKE ? OR description LIKE ?'
    params.push(`%${search}%`, `%${search}%`)
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const groups = await queryMany(sql, params)

  const countSql = search
    ? 'SELECT COUNT(*) as total FROM groups WHERE name LIKE ? OR description LIKE ?'
    : 'SELECT COUNT(*) as total FROM groups'
  const countParams = search ? [`%${search}%`, `%${search}%`] : []
  const [{ total }] = await queryMany(countSql, countParams)

  return { limit, page, total, groups }
}

export async function groupGet(id) {
  const group = await queryOne(
    'SELECT id, name, description, created_at FROM groups WHERE id = ?',
    [id]
  )

  if (!group) throw new Error('Group not found')

  const users = await queryMany(
    `SELECT u.id, u.email, u.username FROM users u
     JOIN group_users gu ON u.id = gu.user_id
     WHERE gu.group_id = ?`,
    [id]
  )

  return { ...group, users }
}

export async function groupCreate(name, description) {
  const result = await queryMany(
    'INSERT INTO groups (name, description) VALUES (?, ?)',
    [name, description || null]
  )
  return await groupGet(result.insertId)
}

export async function groupUpdate(id, { name, description }) {
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
  await queryMany(`UPDATE groups SET ${updates.join(', ')} WHERE id = ?`, params)
  return await groupGet(id)
}

export async function groupDelete(id) {
  const result = await queryMany('DELETE FROM groups WHERE id = ?', [id])
  if (result.affectedRows === 0) throw new Error('Group not found')
  return true
}

export async function groupAddUser(groupId, userId) {
  await queryMany(
    'INSERT INTO group_users (group_id, user_id) VALUES (?, ?)',
    [groupId, userId]
  )
  return true
}

export async function groupRemoveUser(groupId, userId) {
  const result = await queryMany(
    'DELETE FROM group_users WHERE group_id = ? AND user_id = ?',
    [groupId, userId]
  )
  if (result.affectedRows === 0) throw new Error('User not in group')
  return true
}
