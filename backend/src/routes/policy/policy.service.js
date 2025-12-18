const { query } = require('../../utils/db');

async function fnPolicyList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let sql = 'SELECT * FROM system_policies';
  let countSql = 'SELECT COUNT(*) as total FROM system_policies';
  const params = [];
  const countParams = [];

  if (search) {
    sql += ' WHERE name LIKE ? OR description LIKE ?';
    countSql += ' WHERE name LIKE ? OR description LIKE ?';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern);
    countParams.push(searchPattern, searchPattern);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(safe_limit, offset);

  const [policies, countResult] = await Promise.all([
    query(sql, params),
    query(countSql, countParams)
  ]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: countResult[0].total,
    policies
  };
}

async function fnPolicyGet(id) {
  const policies = await query('SELECT * FROM system_policies WHERE id = ?', [Number(id)]);
  if (!policies || policies.length === 0) throw new Error("Policy not found");
  return policies[0];
}

async function fnPolicyCreate(name, description) {
  const result = await query(
    'INSERT INTO system_policies (name, description) VALUES (?, ?)',
    [name, description || null]
  );
  return await fnPolicyGet(result.insertId);
}

async function fnPolicyUpdate(id, { name, description }) {
  const updates = [];
  const params = [];

  if (name !== undefined) {
    updates.push('name = ?');
    params.push(name);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    params.push(description);
  }

  if (updates.length === 0) throw new Error("No fields to update");

  params.push(Number(id));
  await query(
    `UPDATE system_policies SET ${updates.join(', ')} WHERE id = ?`,
    params
  );

  return await fnPolicyGet(id);
}

async function fnPolicyDelete(id) {
  const result = await query('DELETE FROM system_policies WHERE id = ?', [Number(id)]);
  if (result.affectedRows === 0) throw new Error("Policy not found");
  return true;
}

async function fnPolicyAssign(role_id, policy_id) {
  await query(
    'INSERT INTO system_role_policies (role_id, policy_id) VALUES (?, ?)',
    [Number(role_id), Number(policy_id)]
  );
  return true;
}

async function fnPolicyRemove(role_id, policy_id) {
  const result = await query(
    'DELETE FROM system_role_policies WHERE role_id = ? AND policy_id = ?',
    [Number(role_id), Number(policy_id)]
  );
  if (result.affectedRows === 0) throw new Error("Policy assignment not found");
  return true;
}

module.exports = {
  fnPolicyList,
  fnPolicyGet,
  fnPolicyCreate,
  fnPolicyUpdate,
  fnPolicyDelete,
  fnPolicyAssign,
  fnPolicyRemove,
};
