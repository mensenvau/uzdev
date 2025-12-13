import { query, queryOne } from '../../config/db.config.js'

export async function policyList() {
  return await query('SELECT * FROM policies ORDER BY name ASC')
}

export async function policyGet(policyId) {
  const policy = await queryOne('SELECT * FROM policies WHERE id = ?', [policyId])
  if (!policy) throw new Error('Policy not found')
  return policy
}

export async function policyCreate({ name, description }) {
  const result = await query(
    'INSERT INTO policies (name, description) VALUES (?, ?)',
    [name, description]
  )
  return await policyGet(result.insertId)
}

export async function policyUpdate(policyId, { name, description }) {
  await query(
    'UPDATE policies SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?',
    [name, description, policyId]
  )
  return await policyGet(policyId)
}

export async function policyDelete(policyId) {
  const result = await query('DELETE FROM policies WHERE id = ?', [policyId])
  if (result.affectedRows === 0) throw new Error('Policy not found')
  return true
}

export async function policyAssignToRole(roleId, policyId) {
  await query(
    'INSERT IGNORE INTO role_policies (role_id, policy_id) VALUES (?, ?)',
    [roleId, policyId]
  )
  return true
}

export async function policyRemoveFromRole(roleId, policyId) {
  await query(
    'DELETE FROM role_policies WHERE role_id = ? AND policy_id = ?',
    [roleId, policyId]
  )
  return true
}

export default {
  policyList,
  policyGet,
  policyCreate,
  policyUpdate,
  policyDelete,
  policyAssignToRole,
  policyRemoveFromRole
}
