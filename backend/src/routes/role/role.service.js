const { queryMany, queryOne } = require("../../utils/db");
const { getPaginatedList } = require("../../utils/pagination.util");

async function listRoles({ limit = 10, page = 1, search = "" }) {
  const result = await getPaginatedList({
    table_name: "system_roles",
    search_fields: ["name", "description"],
    limit,
    page,
    search
  });

  return {
    limit: result.limit,
    page: result.page,
    total: result.total,
    roles: result.items
  };
}

async function getRole(role_id) {
  const role = await queryOne("SELECT * FROM system_roles WHERE id = ?", [Number(role_id)]);
  if (!role) throw new Error("Role not found");

  const [policies, users] = await Promise.all([
    queryMany(
      `SELECT p.*
       FROM system_policies p
       INNER JOIN system_role_policies rp ON rp.policy_id = p.id
       WHERE rp.role_id = ?`,
      [Number(role_id)]
    ),
    queryMany(
      `SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.phone, u.created_at
       FROM system_users u
       INNER JOIN system_user_roles ur ON ur.user_id = u.id
       WHERE ur.role_id = ?`,
      [Number(role_id)]
    )
  ]);

  return {
    ...role,
    policies,
    users
  };
}

async function createRole(name, description) {
  const result = await queryMany(
    "INSERT INTO system_roles (name, description) VALUES (?, ?)",
    [name, description || null]
  );
  return await getRole(result.insertId);
}

async function updateRole(role_id, { name, description }) {
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

  update_params.push(Number(role_id));
  await queryMany(`UPDATE system_roles SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await getRole(role_id);
}

async function deleteRole(role_id) {
  const result = await queryMany("DELETE FROM system_roles WHERE id = ?", [Number(role_id)]);
  if (result.affectedRows === 0) throw new Error("Role not found");
  return true;
}

async function assignRole(user_id, role_id) {
  await queryMany(
    "INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)",
    [Number(user_id), Number(role_id)]
  );
  return true;
}

async function removeRole(user_id, role_id) {
  const result = await queryMany(
    "DELETE FROM system_user_roles WHERE user_id = ? AND role_id = ?",
    [Number(user_id), Number(role_id)]
  );
  if (result.affectedRows === 0) throw new Error("Role assignment not found");

  const users = await queryMany(
    "SELECT default_role_id FROM system_users WHERE id = ?",
    [Number(user_id)]
  );

  if (users[0]?.default_role_id === Number(role_id)) {
    const replacement_roles = await queryMany(
      "SELECT role_id FROM system_user_roles WHERE user_id = ? LIMIT 1",
      [Number(user_id)]
    );

    const new_default_role_id = replacement_roles[0]?.role_id || null;
    await queryMany(
      "UPDATE system_users SET default_role_id = ? WHERE id = ?",
      [new_default_role_id, Number(user_id)]
    );
  }

  return true;
}

module.exports = {
  listRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  assignRole,
  removeRole
};
