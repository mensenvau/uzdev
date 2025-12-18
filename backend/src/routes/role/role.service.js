const { query } = require('../../utils/db');

async function fnRoleList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let sql = 'SELECT * FROM system_roles';
  let countSql = 'SELECT COUNT(*) as total FROM system_roles';
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

  const [roles, countResult] = await Promise.all([
    query(sql, params),
    query(countSql, countParams)
  ]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: countResult[0].total,
    roles
  };
}

async function fnRoleGet(id) {
  const roles = await query('SELECT * FROM system_roles WHERE id = ?', [Number(id)]);
  if (!roles || roles.length === 0) throw new Error("Role not found");

  // Get policies for this role
  const policies = await query(
    `SELECT p.*
     FROM system_policies p
     INNER JOIN system_role_policies rp ON rp.policy_id = p.id
     WHERE rp.role_id = ?`,
    [Number(id)]
  );

  // Get users with this role
  const users = await query(
    `SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.phone, u.created_at
     FROM system_users u
     INNER JOIN system_user_roles ur ON ur.user_id = u.id
     WHERE ur.role_id = ?`,
    [Number(id)]
  );

  return {
    ...roles[0],
    policies,
    users
  };
}

async function fnRoleCreate(name, description) {
  const result = await query(
    'INSERT INTO system_roles (name, description) VALUES (?, ?)',
    [name, description || null]
  );
  return await fnRoleGet(result.insertId);
}

async function fnRoleUpdate(id, { name, description }) {
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
    `UPDATE system_roles SET ${updates.join(', ')} WHERE id = ?`,
    params
  );

  return await fnRoleGet(id);
}

async function fnRoleDelete(id) {
  const result = await query('DELETE FROM system_roles WHERE id = ?', [Number(id)]);
  if (result.affectedRows === 0) throw new Error("Role not found");
  return true;
}

async function fnRoleAssign(user_id, role_id) {
  await query(
    'INSERT INTO system_user_roles (user_id, role_id) VALUES (?, ?)',
    [Number(user_id), Number(role_id)]
  );
  return true;
}

async function fnRoleRemove(user_id, role_id) {
  const result = await query(
    'DELETE FROM system_user_roles WHERE user_id = ? AND role_id = ?',
    [Number(user_id), Number(role_id)]
  );
  if (result.affectedRows === 0) throw new Error("Role assignment not found");

  // Check if removed role was user's default role
  const users = await query(
    'SELECT default_role_id FROM system_users WHERE id = ?',
    [Number(user_id)]
  );

  if (users[0]?.default_role_id === Number(role_id)) {
    // Find a replacement role for this user
    const replacementRoles = await query(
      'SELECT role_id FROM system_user_roles WHERE user_id = ? LIMIT 1',
      [Number(user_id)]
    );

    const newDefaultRoleId = replacementRoles[0]?.role_id || null;
    await query(
      'UPDATE system_users SET default_role_id = ? WHERE id = ?',
      [newDefaultRoleId, Number(user_id)]
    );
  }

  return true;
}

module.exports = {
  fnRoleList,
  fnRoleGet,
  fnRoleCreate,
  fnRoleUpdate,
  fnRoleDelete,
  fnRoleAssign,
  fnRoleRemove,
};
