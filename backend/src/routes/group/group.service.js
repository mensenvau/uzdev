import { queryMany, queryOne } from "../../utils/db.util.js";

export async function fnGroupList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;
  let sql = "SELECT id, name, description, created_at FROM system_groups";
  const params = [];

  if (search) {
    sql += " WHERE name LIKE ? OR description LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY created_at DESC LIMIT ${safe_limit} OFFSET ${offset}`;

  const groups = await queryMany(sql, params);

  const count_sql = search ? "SELECT COUNT(*) as total FROM system_groups WHERE name LIKE ? OR description LIKE ?" : "SELECT COUNT(*) as total FROM system_groups";
  const count_params = search ? [`%${search}%`, `%${search}%`] : [];
  const [{ total }] = await queryMany(count_sql, count_params);

  return { limit: safe_limit, page: safe_page, total, groups };
}

export async function fnGroupGet(id) {
  const group = await queryOne("SELECT id, name, description, created_at FROM system_groups WHERE id = ?", [id]);

  if (!group) throw new Error("Group not found");

  const users = await queryMany(
    `SELECT u.id, u.email, u.username FROM system_users u
     JOIN system_group_users gu ON u.id = gu.user_id
     WHERE gu.group_id = ?`,
    [id]
  );

  return { ...group, users };
}

export async function fnGroupCreate(name, description) {
  const result = await queryMany("INSERT INTO system_groups (name, description) VALUES (?, ?)", [name, description || null]);
  return await fnGroupGet(result.insertId);
}

export async function fnGroupUpdate(id, { name, description }) {
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
  await queryMany(`UPDATE system_groups SET ${updates.join(", ")} WHERE id = ?`, params);
  return await fnGroupGet(id);
}

export async function fnGroupDelete(id) {
  const result = await queryMany("DELETE FROM system_groups WHERE id = ?", [id]);
  if (result.affectedRows === 0) throw new Error("Group not found");
  return true;
}

export async function fnGroupAssign(group_id, user_id) {
  await queryMany("INSERT INTO system_group_users (group_id, user_id) VALUES (?, ?)", [group_id, user_id]);
  return true;
}

export async function fnGroupRemove(group_id, user_id) {
  const result = await queryMany("DELETE FROM system_group_users WHERE group_id = ? AND user_id = ?", [group_id, user_id]);
  if (result.affectedRows === 0) throw new Error("User not in group");
  return true;
}
