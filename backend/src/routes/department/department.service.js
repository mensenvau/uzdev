import { queryMany, queryOne } from "../../utils/db.util.js";

export async function fnDepartmentList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let sql = "SELECT id, name, description, created_at FROM system_departments";
  const params = [];

  if (search) {
    sql += " WHERE name LIKE ? OR description LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY created_at DESC LIMIT ${safe_limit} OFFSET ${offset}`;

  const departments = await queryMany(sql, params);

  const count_sql = search ? "SELECT COUNT(*) as total FROM system_departments WHERE name LIKE ? OR description LIKE ?" : "SELECT COUNT(*) as total FROM system_departments";
  const count_params = search ? [`%${search}%`, `%${search}%`] : [];
  const [{ total }] = await queryMany(count_sql, count_params);

  return { limit: safe_limit, page: safe_page, total, departments };
}

export async function fnDepartmentGet(id) {
  const department = await queryOne("SELECT id, name, description, created_at FROM system_departments WHERE id = ?", [id]);
  if (!department) throw new Error("Department not found");

  const users = await queryMany(
    `SELECT u.id, u.email, u.first_name, u.last_name, u.phone
     FROM system_user_departments ud
     JOIN system_users u ON u.id = ud.user_id
     WHERE ud.department_id = ?`,
    [id]
  );

  return { ...department, users };
}

export async function fnDepartmentCreate(name, description) {
  const result = await queryMany("INSERT INTO system_departments (name, description) VALUES (?, ?)", [name, description || null]);
  return await fnDepartmentGet(result.insertId);
}

export async function fnDepartmentUpdate(id, { name, description }) {
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
  await queryMany(`UPDATE system_departments SET ${updates.join(", ")} WHERE id = ?`, params);
  return await fnDepartmentGet(id);
}

export async function fnDepartmentDelete(id) {
  const result = await queryMany("DELETE FROM system_departments WHERE id = ?", [id]);
  if (result.affectedRows === 0) throw new Error("Department not found");
  return true;
}

export async function fnDepartmentAssign(user_id, department_id) {
  await queryMany("INSERT IGNORE INTO system_user_departments (user_id, department_id) VALUES (?, ?)", [user_id, department_id]);
  return true;
}

export async function fnDepartmentRemove(user_id, department_id) {
  const result = await queryMany("DELETE FROM system_user_departments WHERE user_id = ? AND department_id = ?", [user_id, department_id]);
  if (result.affectedRows === 0) throw new Error("Department assignment not found");
  return true;
}
