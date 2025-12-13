import { queryOne, queryMany } from '../../utils/db.util.js'

export async function findAllPolicies() {
  return await queryMany('SELECT * FROM policies ORDER BY name ASC')
}

export async function findPolicyById(id) {
  return await queryOne('SELECT * FROM policies WHERE id = ?', [id])
}

export async function createPolicy(name, description) {
  const result = await queryMany(
    'INSERT INTO policies (name, description) VALUES (?, ?)',
    [name, description]
  )
  return result.insertId
}

export async function updatePolicy(id, { name, description }) {
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
  await queryMany(`UPDATE policies SET ${updates.join(', ')} WHERE id = ?`, params)
  return await findPolicyById(id)
}

export async function deletePolicy(id) {
  const result = await queryMany('DELETE FROM policies WHERE id = ?', [id])
  return result.affectedRows > 0
}

export async function assignPolicyToRole(roleId, policyId) {
  await queryMany(
    'INSERT IGNORE INTO role_policies (role_id, policy_id) VALUES (?, ?)',
    [roleId, policyId]
  )
  return true
}

export async function removePolicyFromRole(roleId, policyId) {
  await queryMany(
    'DELETE FROM role_policies WHERE role_id = ? AND policy_id = ?',
    [roleId, policyId]
  )
  return true
}

export default {
  findAllPolicies,
  findPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
  assignPolicyToRole,
  removePolicyFromRole
}
