const db = require("../../config/database");

async function fnGetAllGroups() {
  const query = `
    SELECT
      g.id,
      g.name,
      g.description,
      g.created_at,
      g.updated_at,
      COUNT(DISTINCT gu.user_id) as member_count
    FROM system_groups g
    LEFT JOIN system_group_users gu ON g.id = gu.group_id
    GROUP BY g.id
    ORDER BY g.name ASC
  `;

  const [rows] = await db.query(query);
  return rows;
}

async function fnGetFormGroups({ form_id }) {
  const query = `
    SELECT
      g.id,
      g.name,
      g.description,
      fg.created_at as assigned_at,
      COUNT(DISTINCT gu.user_id) as member_count
    FROM form_groups fg
    INNER JOIN system_groups g ON fg.group_id = g.id
    LEFT JOIN system_group_users gu ON g.id = gu.group_id
    WHERE fg.form_id = ?
    GROUP BY g.id
    ORDER BY g.name ASC
  `;

  const [rows] = await db.query(query, [form_id]);
  return rows;
}

async function fnAssignFormToGroup({ form_id, group_id }) {
  const query = `
    INSERT INTO form_groups (form_id, group_id)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP
  `;

  await db.query(query, [form_id, group_id]);
  return { form_id, group_id };
}

async function fnRemoveFormFromGroup({ form_id, group_id }) {
  const query = `DELETE FROM form_groups WHERE form_id = ? AND group_id = ?`;
  await db.query(query, [form_id, group_id]);
  return { form_id, group_id };
}

module.exports = {
  fnGetAllGroups,
  fnGetFormGroups,
  fnAssignFormToGroup,
  fnRemoveFormFromGroup,
};
