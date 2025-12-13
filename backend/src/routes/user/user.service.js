import { queryMany, queryOne, poolConnection } from '../../utils/db.util.js'
import { hashPassword } from '../../utils/password.util.js'

export async function userList({ limit = 50, offset = 0 }) {
  const users = await queryMany(
    `SELECT u.id, u.email, u.username, u.is_email_verified, u.created_at, u.updated_at,
     GROUP_CONCAT(DISTINCT r.name) as roles
     FROM users u
     LEFT JOIN user_roles ur ON u.id = ur.user_id
     LEFT JOIN roles r ON ur.role_id = r.id
     GROUP BY u.id
     ORDER BY u.created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  const total = await queryOne('SELECT COUNT(*) as count FROM users')

  return {
    users,
    total: total.count,
    limit,
    offset
  }
}

export async function userGet(userId) {
  const user = await queryOne(
    `SELECT u.id, u.email, u.username, u.is_email_verified, u.google_id, u.created_at, u.updated_at
     FROM users u
     WHERE u.id = ?`,
    [userId]
  )

  if (!user) {
    throw new Error('User not found')
  }

  const roles = await queryMany(
    `SELECT r.id, r.name, r.description
     FROM roles r
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ?`,
    [userId]
  )

  const policies = await queryMany(
    `SELECT DISTINCT p.id, p.name, p.description
     FROM policies p
     JOIN role_policies rp ON p.id = rp.policy_id
     JOIN user_roles ur ON rp.role_id = ur.role_id
     WHERE ur.user_id = ?`,
    [userId]
  )

  return {
    ...user,
    roles,
    policies
  }
}

export async function userCreate({ email, username, password, roleIds = [] }) {
  const existingUser = await queryOne(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  )

  if (existingUser) {
    throw new Error('Email or username already exists')
  }

  const passwordHash = await hashPassword(password)

  const conn = await poolConnection.getConnection()
  try {
    await conn.beginTransaction()

    const [userResult] = await conn.execute(
      'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
      [email, username, passwordHash]
    )

    const userId = userResult.insertId

    if (roleIds.length > 0) {
      for (const roleId of roleIds) {
        await conn.execute(
          'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
          [userId, roleId]
        )
      }
    }

    await conn.commit()

    return await userGet(userId)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function userUpdate(userId, { email, username }) {
  const user = await queryOne('SELECT id FROM users WHERE id = ?', [userId])

  if (!user) {
    throw new Error('User not found')
  }

  const existingUser = await queryOne(
    'SELECT id FROM users WHERE (email = ? OR username = ?) AND id != ?',
    [email, username, userId]
  )

  if (existingUser) {
    throw new Error('Email or username already exists')
  }

  await queryMany(
    'UPDATE users SET email = ?, username = ? WHERE id = ?',
    [email, username, userId]
  )

  return await userGet(userId)
}

export async function userDelete(userId) {
  const user = await queryOne('SELECT id FROM users WHERE id = ?', [userId])

  if (!user) {
    throw new Error('User not found')
  }

  await queryMany('DELETE FROM users WHERE id = ?', [userId])

  return true
}

export async function userAssignRole(userId, roleId) {
  const user = await queryOne('SELECT id FROM users WHERE id = ?', [userId])
  if (!user) {
    throw new Error('User not found')
  }

  const role = await queryOne('SELECT id FROM roles WHERE id = ?', [roleId])
  if (!role) {
    throw new Error('Role not found')
  }

  const existing = await queryOne(
    'SELECT id FROM user_roles WHERE user_id = ? AND role_id = ?',
    [userId, roleId]
  )

  if (existing) {
    throw new Error('User already has this role')
  }

  await queryMany(
    'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
    [userId, roleId]
  )

  return true
}

export async function userRemoveRole(userId, roleId) {
  const existing = await queryOne(
    'SELECT id FROM user_roles WHERE user_id = ? AND role_id = ?',
    [userId, roleId]
  )

  if (!existing) {
    throw new Error('User does not have this role')
  }

  await queryMany(
    'DELETE FROM user_roles WHERE user_id = ? AND role_id = ?',
    [userId, roleId]
  )

  return true
}

export default {
  userList,
  userGet,
  userCreate,
  userUpdate,
  userDelete,
  userAssignRole,
  userRemoveRole
}
