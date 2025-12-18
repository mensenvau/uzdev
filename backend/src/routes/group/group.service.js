const { query } = require('../../utils/db');

async function fnGroupList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let sql = 'SELECT * FROM system_groups';
  let countSql = 'SELECT COUNT(*) as total FROM system_groups';
  const params = [];
  const countParams = [];

  if (search) {
    sql += ' WHERE name LIKE ? OR description LIKE ?';
    countSql += ' WHERE name LIKE ? OR description LIKE ?';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern);
    countParams.push(searchPattern, searchPattern);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(safe_limit, offset);

  const [groups, countResult] = await Promise.all([
    query(sql, params),
    query(countSql, countParams)
  ]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: countResult[0].total,
    groups
  };
}

async function fnGroupGet(id) {
  const groups = await query('SELECT * FROM system_groups WHERE id = ?', [Number(id)]);
  if (!groups || groups.length === 0) throw new Error("Group not found");

  // Get users in this group
  const users = await query(
    `SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.phone, u.created_at
     FROM system_users u
     INNER JOIN system_group_users gu ON gu.user_id = u.id
     WHERE gu.group_id = ?`,
    [Number(id)]
  );

  return { ...groups[0], users };
}

async function fnGroupCreate(name, description) {
  const result = await query(
    'INSERT INTO system_groups (name, description) VALUES (?, ?)',
    [name, description || null]
  );
  return await fnGroupGet(result.insertId);
}

async function fnGroupUpdate(id, { name, description }) {
  const updates = [];
  const params = [];

  if (name !== undefined) {
    updates.push('name = ?');
    params.push(name);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    params.push(description);
  }

  if (updates.length === 0) throw new Error("No fields to update");

  params.push(Number(id));
  await query(
    `UPDATE system_groups SET ${updates.join(', ')} WHERE id = ?`,
    params
  );

  return await fnGroupGet(id);
}

async function fnGroupDelete(id) {
  const result = await query('DELETE FROM system_groups WHERE id = ?', [Number(id)]);
  if (result.affectedRows === 0) throw new Error("Group not found");
  return true;
}

async function fnGroupAssign(group_id, user_id) {
  await query(
    'INSERT INTO system_group_users (group_id, user_id) VALUES (?, ?)',
    [Number(group_id), Number(user_id)]
  );
  return true;
}

async function fnGroupRemove(group_id, user_id) {
  const result = await query(
    'DELETE FROM system_group_users WHERE group_id = ? AND user_id = ?',
    [Number(group_id), Number(user_id)]
  );
  if (result.affectedRows === 0) throw new Error("User not in group");
  return true;
}

module.exports = {
  fnGroupList,
  fnGroupGet,
  fnGroupCreate,
  fnGroupUpdate,
  fnGroupDelete,
  fnGroupAssign,
  fnGroupRemove,
};
