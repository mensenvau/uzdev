const { queryMany, queryOne } = require("../../utils/db");

async function fnGroupList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let main_sql = "SELECT * FROM system_groups";
  let count_sql = "SELECT COUNT(*) as total FROM system_groups";
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

  const [groups, count_res] = await Promise.all([queryMany(main_sql, main_params), queryMany(count_sql, count_params)]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: count_res[0].total,
    groups,
  };
}

async function fnGroupGet(id) {
  const group = await queryOne("SELECT * FROM system_groups WHERE id = ?", [Number(id)]);
  if (!group) throw new Error("Group not found");

  const users = await queryMany(
    `SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.phone, u.created_at
     FROM system_users u
     INNER JOIN system_group_users gu ON gu.user_id = u.id
     WHERE gu.group_id = ?`,
    [Number(id)]
  );

  return { ...group, users };
}

async function fnGroupCreate(name, description) {
  const result = await queryMany("INSERT INTO system_groups (name, description) VALUES (?, ?)", [name, description || null]);
  return await fnGroupGet(result.insertId);
}

async function fnGroupUpdate(id, { name, description }) {
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
  await queryMany(`UPDATE system_groups SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await fnGroupGet(id);
}

async function fnGroupDelete(id) {
  const result = await queryMany("DELETE FROM system_groups WHERE id = ?", [Number(id)]);
  if (result.affectedRows === 0) throw new Error("Group not found");
  return true;
}

async function fnGroupAssign(group_id, user_id) {
  await queryMany("INSERT INTO system_group_users (group_id, user_id) VALUES (?, ?)", [Number(group_id), Number(user_id)]);
  return true;
}

async function fnGroupRemove(group_id, user_id) {
  const result = await queryMany("DELETE FROM system_group_users WHERE group_id = ? AND user_id = ?", [Number(group_id), Number(user_id)]);
  if (result.affectedRows === 0) throw new Error("User not in group");
  return true;
}

async function fnGetFormGroups({ form_id }) {
  const sql = `
    SELECT
      g.id,
      g.name,
      g.description,
      sfg.created_at AS assigned_at,
      COUNT(DISTINCT gu.user_id) AS member_count
    FROM system_form_groups sfg
    INNER JOIN system_groups g ON sfg.group_id = g.id
    LEFT JOIN system_group_users gu ON g.id = gu.group_id
    WHERE sfg.form_id = ?
    GROUP BY g.id
    ORDER BY g.name ASC
  `;

  return queryMany(sql, [form_id]);
}

async function fnAssignFormToGroup({ form_id, group_id }) {
  await queryMany(
    `INSERT INTO system_form_groups (form_id, group_id)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
    [form_id, Number(group_id)]
  );

  return { form_id, group_id: Number(group_id) };
}

async function fnRemoveFormFromGroup({ form_id, group_id }) {
  await queryMany("DELETE FROM system_form_groups WHERE form_id = ? AND group_id = ?", [form_id, Number(group_id)]);
  return { form_id, group_id: Number(group_id) };
}

module.exports = {
  fnGroupList,
  fnGroupGet,
  fnGroupCreate,
  fnGroupUpdate,
  fnGroupDelete,
  fnGroupAssign,
  fnGroupRemove,
  fnGetFormGroups,
  fnAssignFormToGroup,
  fnRemoveFormFromGroup,
};
