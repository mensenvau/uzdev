const { hashPassword } = require("../../utils/password.util");
const { queryMany, queryOne } = require("../../utils/db");

async function fnUserList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let main_sql = "SELECT id, email, first_name, last_name, phone, created_at, default_role_id FROM system_users";
  let count_sql = "SELECT COUNT(*) as total FROM system_users";
  const main_params = [];
  const count_params = [];

  if (search) {
    main_sql += " WHERE email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?";
    count_sql += " WHERE email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?";
    const search_pattern = `%${search}%`;
    main_params.push(search_pattern, search_pattern, search_pattern, search_pattern);
    count_params.push(search_pattern, search_pattern, search_pattern, search_pattern);
  }

  main_sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  main_params.push(safe_limit, offset);

  const [users, count_res] = await Promise.all([queryMany(main_sql, main_params), queryMany(count_sql, count_params)]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: count_res[0].total,
    users,
  };
}

async function fnUserGet(id) {
  const user = await queryOne("SELECT * FROM system_users WHERE id = ?", [Number(id)]);
  if (!user) throw new Error("User not found");

  let default_role = null;
  if (user.default_role_id) {
    default_role = await queryOne("SELECT * FROM system_roles WHERE id = ?", [user.default_role_id]);
  }

  const roles = await queryMany(`SELECT r.* FROM system_roles r  INNER JOIN system_user_roles ur ON ur.role_id = r.id WHERE ur.user_id = ?`, [Number(id)]);
  const groups = await queryMany(`SELECT g.* FROM system_groups g INNER JOIN system_group_users gu ON gu.group_id = g.id WHERE gu.user_id = ?`, [Number(id)]);

  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    created_at: user.created_at,
    default_role_id: user.default_role_id,
    default_role,
    roles,
    groups,
  };
}

async function fnUserCreate(email, password, first_name, last_name, phone) {
  const hashed_password = await hashPassword(password);
  const result = await queryMany("INSERT INTO system_users (email, username, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?, ?)", [email, email, first_name, last_name, phone, hashed_password]);
  return await fnUserGet(result.insertId);
}

async function fnUserUpdate(id, { email, first_name, last_name, phone, default_role_id }) {
  const updates = [];
  const update_params = [];

  if (email !== undefined) {
    updates.push("email = ?");
    update_params.push(email);
  }
  if (first_name !== undefined) {
    updates.push("first_name = ?");
    update_params.push(first_name);
  }
  if (last_name !== undefined) {
    updates.push("last_name = ?");
    update_params.push(last_name);
  }
  if (phone !== undefined) {
    updates.push("phone = ?");
    update_params.push(phone);
  }

  if (default_role_id !== undefined) {
    const has_role = await queryMany("SELECT id FROM system_user_roles WHERE user_id = ? AND role_id = ?", [Number(id), Number(default_role_id)]);
    if (has_role.length === 0) throw new Error("Default role must be one of the user's roles");

    updates.push("default_role_id = ?");
    update_params.push(Number(default_role_id));
  }

  if (updates.length === 0) throw new Error("No fields to update");
  update_params.push(Number(id));

  await queryMany(`UPDATE system_users SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await fnUserGet(id);
}

async function fnUserDelete(id) {
  const result = await queryMany("DELETE FROM system_users WHERE id = ?", [Number(id)]);
  if (result.affectedRows === 0) throw new Error("User not found");
  return true;
}

module.exports = {
  fnUserList,
  fnUserGet,
  fnUserCreate,
  fnUserUpdate,
  fnUserDelete,
};
