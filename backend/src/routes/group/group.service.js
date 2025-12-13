import { queryMany, queryOne, poolConnection } from '../../utils/db.util.js'

export async function groupList({ limit = 50, offset = 0 }) {
  const groups = await queryMany(
    `SELECT g.id, g.name, g.description, g.created_at, g.updated_at,
     COUNT(DISTINCT gu.user_id) as user_count
     FROM groups g
     LEFT JOIN group_users gu ON g.id = gu.group_id
     GROUP BY g.id
     ORDER BY g.created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  const total = await queryOne('SELECT COUNT(*) as count FROM groups')

  return {
    groups,
    total: total.count,
    limit,
    offset
  }
}

export async function groupGet(groupId) {
  const group = await queryOne(
    'SELECT id, name, description, created_at, updated_at FROM groups WHERE id = ?',
    [groupId]
  )

  if (!group) {
    throw new Error('Group not found')
  }

  const users = await queryMany(
    `SELECT u.id, u.email, u.username, u.is_email_verified
     FROM users u
     JOIN group_users gu ON u.id = gu.user_id
     WHERE gu.group_id = ?`,
    [groupId]
  )

  return {
    ...group,
    users
  }
}

export async function groupCreate({ name, description, userIds = [] }) {
  const conn = await poolConnection.getConnection()
  try {
    await conn.beginTransaction()

    const [groupResult] = await conn.execute(
      'INSERT INTO groups (name, description) VALUES (?, ?)',
      [name, description]
    )

    const groupId = groupResult.insertId

    if (userIds.length > 0) {
      for (const userId of userIds) {
        await conn.execute(
          'INSERT INTO group_users (group_id, user_id) VALUES (?, ?)',
          [groupId, userId]
        )
      }
    }

    await conn.commit()

    return await groupGet(groupId)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function groupUpdate(groupId, { name, description }) {
  const group = await queryOne('SELECT id FROM groups WHERE id = ?', [groupId])

  if (!group) {
    throw new Error('Group not found')
  }

  await queryMany(
    'UPDATE groups SET name = ?, description = ? WHERE id = ?',
    [name, description, groupId]
  )

  return await groupGet(groupId)
}

export async function groupDelete(groupId) {
  const group = await queryOne('SELECT id FROM groups WHERE id = ?', [groupId])

  if (!group) {
    throw new Error('Group not found')
  }

  await queryMany('DELETE FROM groups WHERE id = ?', [groupId])

  return true
}

export async function groupAddUser(groupId, userId) {
  const group = await queryOne('SELECT id FROM groups WHERE id = ?', [groupId])
  if (!group) {
    throw new Error('Group not found')
  }

  const user = await queryOne('SELECT id FROM users WHERE id = ?', [userId])
  if (!user) {
    throw new Error('User not found')
  }

  const existing = await queryOne(
    'SELECT id FROM group_users WHERE group_id = ? AND user_id = ?',
    [groupId, userId]
  )

  if (existing) {
    throw new Error('User already in this group')
  }

  await queryMany(
    'INSERT INTO group_users (group_id, user_id) VALUES (?, ?)',
    [groupId, userId]
  )

  return true
}

export async function groupRemoveUser(groupId, userId) {
  const existing = await queryOne(
    'SELECT id FROM group_users WHERE group_id = ? AND user_id = ?',
    [groupId, userId]
  )

  if (!existing) {
    throw new Error('User not in this group')
  }

  await queryMany(
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
