const { queryMany, queryOne } = require("../../utils/db");

async function fnRoleList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let main_sql = "SELECT * FROM system_roles";
  let count_sql = "SELECT COUNT(*) as total FROM system_roles";
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

  const [roles, count_res] = await Promise.all([queryMany(main_sql, main_params), queryMany(count_sql, count_params)]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: count_res[0].total,
    roles,
  };
}

async function fnRoleGet(id) {
  const role = await queryOne("SELECT * FROM system_roles WHERE id = ?", [Number(id)]);
  if (!role) throw new Error("Role not found");

  const [policies, users] = await Promise.all([
    queryMany(
      `SELECT p.*
       FROM system_policies p
       INNER JOIN system_role_policies rp ON rp.policy_id = p.id
       WHERE rp.role_id = ?`,
      [Number(id)]
    ),
    queryMany(
      `SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.phone, u.created_at
       FROM system_users u
       INNER JOIN system_user_roles ur ON ur.user_id = u.id
       WHERE ur.role_id = ?`,
      [Number(id)]
    ),
  ]);

  return {
    ...role,
    policies,
    users,
  };
}

async function fnRoleCreate(name, description) {
  const result = await queryMany("INSERT INTO system_roles (name, description) VALUES (?, ?)", [name, description || null]);
  return await fnRoleGet(result.insertId);
}

async function fnRoleUpdate(id, { name, description }) {
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
  await queryMany(`UPDATE system_roles SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await fnRoleGet(id);
}

async function fnRoleDelete(id) {
  const result = await queryMany("DELETE FROM system_roles WHERE id = ?", [Number(id)]);
  if (result.affectedRows === 0) throw new Error("Role not found");
  return true;
}

async function fnRoleAssign(user_id, role_id) {
  await queryMany("INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)", [Number(user_id), Number(role_id)]);
  return true;
}

async function fnRoleRemove(user_id, role_id) {
  const result = await queryMany("DELETE FROM system_user_roles WHERE user_id = ? AND role_id = ?", [Number(user_id), Number(role_id)]);
  if (result.affectedRows === 0) throw new Error("Role assignment not found");

  // Check if removed role was user's default role
  const users = await queryMany("SELECT default_role_id FROM system_users WHERE id = ?", [Number(user_id)]);

  if (users[0]?.default_role_id === Number(role_id)) {
    const replacement_roles = await queryMany("SELECT role_id FROM system_user_roles WHERE user_id = ? LIMIT 1", [Number(user_id)]);

    const new_default_role_id = replacement_roles[0]?.role_id || null;
    await queryMany("UPDATE system_users SET default_role_id = ? WHERE id = ?", [new_default_role_id, Number(user_id)]);
  }

  return true;
}

module.exports = {
  fnRoleList,
  fnRoleGet,
  fnRoleCreate,
  fnRoleUpdate,
  fnRoleDelete,
  fnRoleAssign,
  fnRoleRemove,
};
