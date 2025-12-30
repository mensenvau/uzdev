const { queryMany, queryOne } = require("../../utils/db");
const { getPaginatedList } = require("../../utils/pagination.util");

async function listPolicies({ limit = 10, page = 1, search = "" }) {
  const result = await getPaginatedList({
    table_name: "system_policies",
    search_fields: ["name", "description"],
    limit,
    page,
    search
  });

  return {
    limit: result.limit,
    page: result.page,
    total: result.total,
    policies: result.items
  };
}

async function getPolicy(policy_id) {
  const policy = await queryOne("SELECT * FROM system_policies WHERE id = ?", [Number(policy_id)]);
  if (!policy) throw new Error("Policy not found");
  return policy;
}

async function createPolicy(name, description) {
  const result = await queryMany(
    "INSERT INTO system_policies (name, description) VALUES (?, ?)",
    [name, description || null]
  );
  return await getPolicy(result.insertId);
}

async function updatePolicy(policy_id, { name, description }) {
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

  update_params.push(Number(policy_id));
  await queryMany(`UPDATE system_policies SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await getPolicy(policy_id);
}

async function deletePolicy(policy_id) {
  const result = await queryMany("DELETE FROM system_policies WHERE id = ?", [Number(policy_id)]);
  if (result.affectedRows === 0) throw new Error("Policy not found");
  return true;
}

async function assignPolicy(role_id, policy_id) {
  await queryMany(
    "INSERT INTO system_role_policies (role_id, policy_id) VALUES (?, ?)",
    [Number(role_id), Number(policy_id)]
  );
  return true;
}

async function removePolicy(role_id, policy_id) {
  const result = await queryMany(
    "DELETE FROM system_role_policies WHERE role_id = ? AND policy_id = ?",
    [Number(role_id), Number(policy_id)]
  );
  if (result.affectedRows === 0) throw new Error("Policy assignment not found");
  return true;
}

module.exports = {
  listPolicies,
  getPolicy,
  createPolicy,
  updatePolicy,
  deletePolicy,
  assignPolicy,
  removePolicy
};
