import { hashPassword } from "../../utils/password.util.js";
import { queryMany, queryOne } from "../../utils/db.util.js";

export async function fnUserList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;
  let sql = "SELECT id, email, first_name, last_name, phone, created_at, default_role_id FROM system_users";
  const params = [];

  if (search) {
    sql += " WHERE email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY created_at DESC LIMIT ${safe_limit} OFFSET ${offset}`;

  const users = await queryMany(sql, params);

  const count_sql = search ? "SELECT COUNT(*) as total FROM system_users WHERE email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?" : "SELECT COUNT(*) as total FROM system_users";
  const count_params = search ? [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`] : [];
  const [{ total }] = await queryMany(count_sql, count_params);

  return { limit: safe_limit, page: safe_page, total, users };
}

export async function fnUserGet(id) {
  const user = await queryOne("SELECT id, email, first_name, last_name, phone, created_at, default_role_id FROM system_users WHERE id = ?", [id]);
  if (!user) throw new Error("User not found");

  const roles = await queryMany(`SELECT r.id, r.name FROM system_roles r JOIN system_user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?`, [id]);
  const groups = await queryMany(`SELECT g.id, g.name FROM system_groups g JOIN system_group_users gu ON g.id = gu.group_id WHERE gu.user_id = ?`, [id]);
  const departments = await queryMany(`SELECT d.id, d.name FROM system_user_departments ud JOIN system_departments d ON d.id = ud.department_id WHERE ud.user_id = ?`, [id]);
  const default_role = user.default_role_id ? roles.find((r) => r.id === user.default_role_id) || null : null;
  return { ...user, roles, groups, departments, default_role };
}

export async function fnUserCreate(email, password, first_name, last_name, phone) {
  const hashed_password = await hashPassword(password);
  const result = await queryMany("INSERT INTO system_users (email, username, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?, ?)", [email, email, first_name, last_name, phone, hashed_password]);
  return await fnUserGet(result.insertId);
}

export async function fnUserUpdate(id, { email, first_name, last_name, phone, default_role_id }) {
  const updates = [];
  const params = [];

  if (email) {
    updates.push("email = ?");
    params.push(email);
  }

  if (first_name !== undefined) {
    updates.push("first_name = ?");
    params.push(first_name);
  }

  if (last_name !== undefined) {
    updates.push("last_name = ?");
    params.push(last_name);
  }

  if (phone !== undefined) {
    updates.push("phone = ?");
    params.push(phone);
  }

  if (default_role_id !== undefined) {
    // validate the role belongs to user
    const hasRole = await queryOne("SELECT id FROM system_user_roles WHERE user_id = ? AND role_id = ?", [id, default_role_id]);
    if (!hasRole) throw new Error("Default role must be one of the user's roles");
    updates.push("default_role_id = ?");
    params.push(default_role_id);
  }

  if (updates.length === 0) throw new Error("No fields to update");

  params.push(id);
  await queryMany(`UPDATE system_users SET ${updates.join(", ")} WHERE id = ?`, params);
  return await fnUserGet(id);
}

export async function fnUserDelete(id) {
  const result = await queryMany("DELETE FROM system_users WHERE id = ?", [id]);
  if (result.affectedRows === 0) throw new Error("User not found");
  return true;
}
