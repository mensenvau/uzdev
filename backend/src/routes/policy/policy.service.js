import { queryMany, queryOne } from '../../utils/db.util.js'

export async function policyList({ limit = 50, offset = 0 }) {
  const policies = await queryMany(
    `SELECT id, name, description, created_at, updated_at
     FROM policies
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  const total = await queryOne('SELECT COUNT(*) as count FROM policies')

  return {
    policies,
    total: total.count,
    limit,
    offset
  }
}

export async function policyGet(policyId) {
  const policy = await queryOne(
    'SELECT id, name, description, created_at, updated_at FROM policies WHERE id = ?',
    [policyId]
  )

  if (!policy) {
    throw new Error('Policy not found')
  }

  return policy
}

export async function policyCreate({ name, description }) {
  const existingPolicy = await queryOne(
    'SELECT id FROM policies WHERE name = ?',
    [name]
  )

  if (existingPolicy) {
    throw new Error('Policy with this name already exists')
  }

  const [result] = await queryMany(
    'INSERT INTO policies (name, description) VALUES (?, ?)',
    [name, description]
  )

  return await policyGet(result.insertId)
}

export async function policyUpdate(policyId, { name, description }) {
  const policy = await queryOne('SELECT id FROM policies WHERE id = ?', [policyId])

  if (!policy) {
    throw new Error('Policy not found')
  }

  const existingPolicy = await queryOne(
    'SELECT id FROM policies WHERE name = ? AND id != ?',
    [name, policyId]
  )

  if (existingPolicy) {
    throw new Error('Policy with this name already exists')
  }

  await queryMany(
    'UPDATE policies SET name = ?, description = ? WHERE id = ?',
    [name, description, policyId]
  )

  return await policyGet(policyId)
}

export async function policyDelete(policyId) {
  const policy = await queryOne('SELECT id FROM policies WHERE id = ?', [policyId])

  if (!policy) {
    throw new Error('Policy not found')
  }

  await queryMany('DELETE FROM policies WHERE id = ?', [policyId])

  return true
}

export default {
  policyList,
  policyGet,
  policyCreate,
  policyUpdate,
  policyDelete
}
