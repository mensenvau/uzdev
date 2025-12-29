const { queryMany, queryOne } = require("../../utils/db");

async function fnPolicyList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let main_sql = "SELECT * FROM system_policies";
  let count_sql = "SELECT COUNT(*) as total FROM system_policies";
  const main_params = [];
  const count_params = [];

  if (search) {
    main_sql += " WHERE name LIKE ? OR description LIKE ?";
    count_sql += " WHERE name LIKE ? OR description LIKE ?";
    const search_pattern = `%${search}%`;
    main_params.push(search_pattern, search_pattern);
    count_params.push(search_pattern, search_pattern);
  }

  main_sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  main_params.push(safe_limit, offset);

  const [policies, count_res] = await Promise.all([queryMany(main_sql, main_params), queryMany(count_sql, count_params)]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: count_res[0].total,
    policies,
  };
}

async function fnPolicyGet(id) {
  const policy = await queryOne("SELECT * FROM system_policies WHERE id = ?", [Number(id)]);
  if (!policy) throw new Error("Policy not found");
  return policy;
}

async function fnPolicyCreate(name, description) {
  const result = await queryMany("INSERT INTO system_policies (name, description) VALUES (?, ?)", [name, description || null]);
  return await fnPolicyGet(result.insertId);
}

async function fnPolicyUpdate(id, { name, description }) {
  const updates = [];
  const update_params = [];

  if (name !== undefined) {
    updates.push("name = ?");
    update_params.push(name);
  }
  if (description !== undefined) {
    updates.push("description = ?");
    update_params.push(description);
  }

  if (updates.length === 0) throw new Error("No fields to update");

  update_params.push(Number(id));
  await queryMany(`UPDATE system_policies SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await fnPolicyGet(id);
}

async function fnPolicyDelete(id) {
  const result = await queryMany("DELETE FROM system_policies WHERE id = ?", [Number(id)]);
  if (result.affectedRows === 0) throw new Error("Policy not found");
  return true;
}

async function fnPolicyAssign(role_id, policy_id) {
  await queryMany("INSERT INTO system_role_policies (role_id, policy_id) VALUES (?, ?)", [Number(role_id), Number(policy_id)]);
  return true;
}

async function fnPolicyRemove(role_id, policy_id) {
  const result = await queryMany("DELETE FROM system_role_policies WHERE role_id = ? AND policy_id = ?", [Number(role_id), Number(policy_id)]);
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
