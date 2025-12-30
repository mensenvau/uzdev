const { queryMany, queryOne } = require("../../utils/db");
const { getPaginatedList } = require("../../utils/pagination.util");

async function listGroups({ limit = 10, page = 1, search = "" }) {
  const result = await getPaginatedList({
    table_name: "system_groups",
    search_fields: ["name", "description"],
    limit,
    page,
    search
  });

  return {
    limit: result.limit,
    page: result.page,
    total: result.total,
    groups: result.items
  };
}

async function getGroup(group_id) {
  const group = await queryOne("SELECT * FROM system_groups WHERE id = ?", [Number(group_id)]);
  if (!group) throw new Error("Group not found");

  const users = await queryMany(
    `SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.phone, u.created_at
     FROM system_users u
     INNER JOIN system_group_users gu ON gu.user_id = u.id
     WHERE gu.group_id = ?`,
    [Number(group_id)]
  );

  return { ...group, users };
}

async function createGroup(name, description) {
  const result = await queryMany(
    "INSERT INTO system_groups (name, description) VALUES (?, ?)",
    [name, description || null]
  );
  return await getGroup(result.insertId);
}

async function updateGroup(group_id, { name, description }) {
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

  update_params.push(Number(group_id));
  await queryMany(`UPDATE system_groups SET ${updates.join(", ")} WHERE id = ?`, update_params);

  return await getGroup(group_id);
}

async function deleteGroup(group_id) {
  const result = await queryMany("DELETE FROM system_groups WHERE id = ?", [Number(group_id)]);
  if (result.affectedRows === 0) throw new Error("Group not found");
  return true;
}

async function assignGroup(group_id, user_id) {
  await queryMany(
    "INSERT INTO system_group_users (group_id, user_id) VALUES (?, ?)",
    [Number(group_id), Number(user_id)]
  );
  return true;
}

async function removeGroup(group_id, user_id) {
  const result = await queryMany(
    "DELETE FROM system_group_users WHERE group_id = ? AND user_id = ?",
    [Number(group_id), Number(user_id)]
  );
  if (result.affectedRows === 0) throw new Error("User not in group");
  return true;
}

async function getFormGroups({ form_id }) {
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

async function assignFormToGroup({ form_id, group_id }) {
  await queryMany(
    `INSERT INTO system_form_groups (form_id, group_id)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
    [form_id, Number(group_id)]
  );

  return { form_id, group_id: Number(group_id) };
}

async function removeFormFromGroup({ form_id, group_id }) {
  await queryMany(
    "DELETE FROM system_form_groups WHERE form_id = ? AND group_id = ?",
    [form_id, Number(group_id)]
  );
  return { form_id, group_id: Number(group_id) };
}

module.exports = {
  listGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  assignGroup,
  removeGroup,
  getFormGroups,
  assignFormToGroup,
  removeFormFromGroup
};
