import { queryMany, queryOne } from '../../utils/db.util.js'

export async function policyList({ limit = 10, page = 1, search = '' }) {
  const offset = (page - 1) * limit
  let sql = 'SELECT id, name, description, created_at FROM policies'
  const params = []

  if (search) {
    sql += ' WHERE name LIKE ? OR description LIKE ?'
    params.push(`%${search}%`, `%${search}%`)
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const policies = await queryMany(sql, params)

  const countSql = search
    ? 'SELECT COUNT(*) as total FROM policies WHERE name LIKE ? OR description LIKE ?'
    : 'SELECT COUNT(*) as total FROM policies'
  const countParams = search ? [`%${search}%`, `%${search}%`] : []
  const [{ total }] = await queryMany(countSql, countParams)

  return { limit, page, total, policies }
}

export async function policyGet(id) {
  const policy = await queryOne(
    'SELECT id, name, description, created_at FROM policies WHERE id = ?',
    [id]
  )

  if (!policy) throw new Error('Policy not found')

  return policy
}

export async function policyCreate(name, description) {
  const result = await queryMany(
    'INSERT INTO policies (name, description) VALUES (?, ?)',
    [name, description || null]
  )
  return await policyGet(result.insertId)
}

export async function policyUpdate(id, { name, description }) {
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
  await queryMany(`UPDATE policies SET ${updates.join(', ')} WHERE id = ?`, params)
  return await policyGet(id)
}

export async function policyDelete(id) {
  const result = await queryMany('DELETE FROM policies WHERE id = ?', [id])
  if (result.affectedRows === 0) throw new Error('Policy not found')
  return true
}

export async function policyAssignToRole(roleId, policyId) {
  await queryMany(
    'INSERT INTO role_policies (role_id, policy_id) VALUES (?, ?)',
    [roleId, policyId]
  )
  return true
}

export async function policyRemoveFromRole(roleId, policyId) {
  const result = await queryMany(
    'DELETE FROM role_policies WHERE role_id = ? AND policy_id = ?',
    [roleId, policyId]
  )
  if (result.affectedRows === 0) throw new Error('Policy assignment not found')
  return true
}
