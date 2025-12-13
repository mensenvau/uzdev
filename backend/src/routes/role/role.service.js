import { queryMany, queryOne, poolConnection } from '../../utils/db.util.js'

export async function roleList({ limit = 50, offset = 0 }) {
  const roles = await queryMany(
    `SELECT r.id, r.name, r.description, r.created_at, r.updated_at,
     GROUP_CONCAT(DISTINCT p.name) as policies
     FROM roles r
     LEFT JOIN role_policies rp ON r.id = rp.role_id
     LEFT JOIN policies p ON rp.policy_id = p.id
     GROUP BY r.id
     ORDER BY r.created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  const total = await queryOne('SELECT COUNT(*) as count FROM roles')

  return {
    roles,
    total: total.count,
    limit,
    offset
  }
}

export async function roleGet(roleId) {
  const role = await queryOne(
    'SELECT id, name, description, created_at, updated_at FROM roles WHERE id = ?',
    [roleId]
  )

  if (!role) {
    throw new Error('Role not found')
  }

  const policies = await queryMany(
    `SELECT p.id, p.name, p.description
     FROM policies p
     JOIN role_policies rp ON p.id = rp.policy_id
     WHERE rp.role_id = ?`,
    [roleId]
  )

  return {
    ...role,
    policies
  }
}

export async function roleCreate({ name, description, policyIds = [] }) {
  const existingRole = await queryOne(
    'SELECT id FROM roles WHERE name = ?',
    [name]
  )

  if (existingRole) {
    throw new Error('Role with this name already exists')
  }

  const conn = await poolConnection.getConnection()
  try {
    await conn.beginTransaction()

    const [roleResult] = await conn.execute(
      'INSERT INTO roles (name, description) VALUES (?, ?)',
      [name, description]
    )

    const roleId = roleResult.insertId

    if (policyIds.length > 0) {
      for (const policyId of policyIds) {
        await conn.execute(
          'INSERT INTO role_policies (role_id, policy_id) VALUES (?, ?)',
          [roleId, policyId]
        )
      }
    }

    await conn.commit()

    return await roleGet(roleId)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function roleUpdate(roleId, { name, description }) {
  const role = await queryOne('SELECT id FROM roles WHERE id = ?', [roleId])

  if (!role) {
    throw new Error('Role not found')
  }

  const existingRole = await queryOne(
    'SELECT id FROM roles WHERE name = ? AND id != ?',
    [name, roleId]
  )

  if (existingRole) {
    throw new Error('Role with this name already exists')
  }

  await queryMany(
    'UPDATE roles SET name = ?, description = ? WHERE id = ?',
    [name, description, roleId]
  )

  return await roleGet(roleId)
}

export async function roleDelete(roleId) {
  const role = await queryOne('SELECT id FROM roles WHERE id = ?', [roleId])

  if (!role) {
    throw new Error('Role not found')
  }

  await queryMany('DELETE FROM roles WHERE id = ?', [roleId])

  return true
}

export async function roleAssignPolicy(roleId, policyId) {
  const role = await queryOne('SELECT id FROM roles WHERE id = ?', [roleId])
  if (!role) {
    throw new Error('Role not found')
  }

  const policy = await queryOne('SELECT id FROM policies WHERE id = ?', [policyId])
  if (!policy) {
    throw new Error('Policy not found')
  }

  const existing = await queryOne(
    'SELECT id FROM role_policies WHERE role_id = ? AND policy_id = ?',
    [roleId, policyId]
  )

  if (existing) {
    throw new Error('Role already has this policy')
  }

  await queryMany(
    'INSERT INTO role_policies (role_id, policy_id) VALUES (?, ?)',
    [roleId, policyId]
  )

  return true
}

export async function roleRemovePolicy(roleId, policyId) {
  const existing = await queryOne(
    'SELECT id FROM role_policies WHERE role_id = ? AND policy_id = ?',
    [roleId, policyId]
  )

  if (!existing) {
    throw new Error('Role does not have this policy')
  }

  await queryMany(
    'DELETE FROM role_policies WHERE role_id = ? AND policy_id = ?',
    [roleId, policyId]
  )

  return true
}

export default {
  roleList,
  roleGet,
  roleCreate,
  roleUpdate,
  roleDelete,
  roleAssignPolicy,
  roleRemovePolicy
}
