import { queryMany, queryOne } from "../../utils/db.util.js";

export async function fnRoleList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let sql = "SELECT id, name, description, created_at FROM system_roles";
  const params = [];

  if (search) {
    sql += " WHERE name LIKE ? OR description LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  // Use literal numbers to avoid prepared statement argument issues with LIMIT/OFFSET
  sql += ` ORDER BY created_at DESC LIMIT ${safe_limit} OFFSET ${offset}`;

  const roles = await queryMany(sql, params);

  const count_sql = search
    ? "SELECT COUNT(*) as total FROM system_roles WHERE name LIKE ? OR description LIKE ?"
    : "SELECT COUNT(*) as total FROM system_roles";
  const count_params = search ? [`%${search}%`, `%${search}%`] : [];
  const [{ total }] = await queryMany(count_sql, count_params);

  return { limit: safe_limit, page: safe_page, total, roles };
}

export async function fnRoleGet(id) {
  const role = await queryOne("SELECT id, name, description, created_at FROM system_roles WHERE id = ?", [id]);

  if (!role) throw new Error("Role not found");

  const policies = await queryMany(
    `SELECT p.id, p.name, p.description FROM system_policies p
     JOIN system_role_policies rp ON p.id = rp.policy_id
     WHERE rp.role_id = ?`,
    [id]
  );

  const users = await queryMany(
    `SELECT u.id, u.email, u.first_name, u.last_name, u.phone
     FROM system_user_roles ur
     JOIN system_users u ON u.id = ur.user_id
     WHERE ur.role_id = ?`,
    [id]
  );

  return { ...role, policies, users };
}

export async function fnRoleCreate(name, description) {
  const result = await queryMany("INSERT INTO system_roles (name, description) VALUES (?, ?)", [name, description || null]);
  return await fnRoleGet(result.insertId);
}

export async function fnRoleUpdate(id, { name, description }) {
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
  await queryMany(`UPDATE system_roles SET ${updates.join(", ")} WHERE id = ?`, params);
  return await fnRoleGet(id);
}

export async function fnRoleDelete(id) {
  const result = await queryMany("DELETE FROM system_roles WHERE id = ?", [id]);
  if (result.affectedRows === 0) throw new Error("Role not found");
  return true;
}

export async function fnRoleAssign(user_id, role_id) {
  await queryMany("INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)", [user_id, role_id]);
  // If no default role set, set this as default
  await queryMany(
    "UPDATE system_users SET default_role_id = COALESCE(default_role_id, ?) WHERE id = ?",
    [role_id, user_id]
  );
  return true;
}

export async function fnRoleRemove(user_id, role_id) {
  const result = await queryMany("DELETE FROM system_user_roles WHERE user_id = ? AND role_id = ?", [user_id, role_id]);
  if (result.affectedRows === 0) throw new Error("Role assignment not found");

  // If removed role was default, choose another or null
  const user = await queryOne("SELECT default_role_id FROM system_users WHERE id = ?", [user_id]);
  if (user?.default_role_id === role_id) {
    const replacement = await queryOne("SELECT role_id FROM system_user_roles WHERE user_id = ? LIMIT 1", [user_id]);
    await queryMany("UPDATE system_users SET default_role_id = ? WHERE id = ?", [replacement ? replacement.role_id : null, user_id]);
  }
  return true;
}
