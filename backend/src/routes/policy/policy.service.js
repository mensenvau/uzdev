import { queryMany, queryOne } from "../../utils/db.util.js";

export async function fnPolicyList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;
  let sql = "SELECT id, name, description, created_at FROM system_policies";
  const params = [];

  if (search) {
    sql += " WHERE name LIKE ? OR description LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY created_at DESC LIMIT ${safe_limit} OFFSET ${offset}`;

  const policies = await queryMany(sql, params);

  const count_sql = search ? "SELECT COUNT(*) as total FROM system_policies WHERE name LIKE ? OR description LIKE ?" : "SELECT COUNT(*) as total FROM system_policies";
  const count_params = search ? [`%${search}%`, `%${search}%`] : [];
  const [{ total }] = await queryMany(count_sql, count_params);

  return { limit: safe_limit, page: safe_page, total, policies };
}

export async function fnPolicyGet(id) {
  const policy = await queryOne("SELECT id, name, description, created_at FROM system_policies WHERE id = ?", [id]);

  if (!policy) throw new Error("Policy not found");

  return policy;
}

export async function fnPolicyCreate(name, description) {
  const result = await queryMany("INSERT INTO system_policies (name, description) VALUES (?, ?)", [name, description || null]);
  return await fnPolicyGet(result.insertId);
}

export async function fnPolicyUpdate(id, { name, description }) {
  const updates = [];
  const params = [];

  if (name) {
    updates.push("name = ?");
    params.push(name);
  }

  if (description !== undefined) {
    updates.push("description = ?");
    params.push(description);
  }

  if (updates.length === 0) throw new Error("No fields to update");

  params.push(id);
  await queryMany(`UPDATE system_policies SET ${updates.join(", ")} WHERE id = ?`, params);
  return await fnPolicyGet(id);
}

export async function fnPolicyDelete(id) {
  const result = await queryMany("DELETE FROM system_policies WHERE id = ?", [id]);
  if (result.affectedRows === 0) throw new Error("Policy not found");
  return true;
}

export async function fnPolicyAssign(role_id, policy_id) {
  await queryMany("INSERT INTO system_role_policies (role_id, policy_id) VALUES (?, ?)", [role_id, policy_id]);
  return true;
}

export async function fnPolicyRemove(role_id, policy_id) {
  const result = await queryMany("DELETE FROM system_role_policies WHERE role_id = ? AND policy_id = ?", [role_id, policy_id]);
  if (result.affectedRows === 0) throw new Error("Policy assignment not found");
  return true;
}
