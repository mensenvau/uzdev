const { hashPassword } = require("../../utils/password.util");
const { queryMany, queryOne } = require("../../utils/db");
const { getPaginatedList } = require("../../utils/pagination.util");

async function listUsers({ limit = 10, page = 1, search = "" }) {
  const result = await getPaginatedList({
    table_name: "system_users",
    select_clause: "id, email, first_name, last_name, phone, created_at, default_role_id",
    search_fields: ["email", "first_name", "last_name", "phone"],
    limit,
    page,
    search
  });

  return {
    limit: result.limit,
    page: result.page,
    total: result.total,
    users: result.items
  };
}

async function getUser(user_id) {
  const user = await queryOne("SELECT * FROM system_users WHERE id = ?", [Number(user_id)]);
  if (!user) throw new Error("User not found");

  let default_role = null;
  if (user.default_role_id) {
    default_role = await queryOne("SELECT * FROM system_roles WHERE id = ?", [user.default_role_id]);
  }

  const roles = await queryMany(
    `SELECT r.* FROM system_roles r
     INNER JOIN system_user_roles ur ON ur.role_id = r.id
     WHERE ur.user_id = ?`,
    [Number(user_id)]
  );

  const groups = await queryMany(
    `SELECT g.* FROM system_groups g
     INNER JOIN system_group_users gu ON gu.group_id = g.id
     WHERE gu.user_id = ?`,
    [Number(user_id)]
  );

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
    groups
  };
}

async function createUser(email, password, first_name, last_name, phone) {
  const hashed_password = await hashPassword(password);
  const result = await queryMany(
    "INSERT INTO system_users (email, username, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?, ?)",
    [email, email, first_name, last_name, phone, hashed_password]
  );
  return await getUser(result.insertId);
}

async function updateUser(user_id, { email, first_name, last_name, phone, default_role_id }) {
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
    const has_role = await queryMany(
      "SELECT id FROM system_user_roles WHERE user_id = ? AND role_id = ?",
      [Number(user_id), Number(default_role_id)]
    );
    if (has_role.length === 0) throw new Error("Default role must be one of the user's roles");

    updates.push("default_role_id = ?");
    update_params.push(Number(default_role_id));
  }

  if (updates.length === 0) throw new Error("No fields to update");
  update_params.push(Number(user_id));

  await queryMany(`UPDATE system_users SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await getUser(user_id);
}

async function deleteUser(user_id) {
  const result = await queryMany("DELETE FROM system_users WHERE id = ?", [Number(user_id)]);
  if (result.affectedRows === 0) throw new Error("User not found");
  return true;
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
