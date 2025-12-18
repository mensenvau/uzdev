const { hashPassword } = require('../../utils/password.util');
const { query } = require('../../utils/db');

async function fnUserList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let sql = 'SELECT id, email, first_name, last_name, phone, created_at, default_role_id FROM system_users';
  let countSql = 'SELECT COUNT(*) as total FROM system_users';
  const params = [];
  const countParams = [];

  if (search) {
    sql += ' WHERE email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?';
    countSql += ' WHERE email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    countParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(safe_limit, offset);

  const [users, countResult] = await Promise.all([
    query(sql, params),
    query(countSql, countParams)
  ]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: countResult[0].total,
    users
  };
}

async function fnUserGet(id) {
  const users = await query('SELECT * FROM system_users WHERE id = ?', [Number(id)]);
  if (!users || users.length === 0) throw new Error("User not found");

  const user = users[0];

  // Get default role
  let default_role = null;
  if (user.default_role_id) {
    const defaultRoles = await query('SELECT * FROM system_roles WHERE id = ?', [user.default_role_id]);
    default_role = defaultRoles[0] || null;
  }

  // Get all roles for this user
  const roles = await query(
    `SELECT r.*
     FROM system_roles r
     INNER JOIN system_user_roles ur ON ur.role_id = r.id
     WHERE ur.user_id = ?`,
    [Number(id)]
  );

  // Get all groups for this user
  const groups = await query(
    `SELECT g.*
     FROM system_groups g
     INNER JOIN system_group_users gu ON gu.group_id = g.id
     WHERE gu.user_id = ?`,
    [Number(id)]
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

async function fnUserCreate(email, password, first_name, last_name, phone) {
  const hashed_password = await hashPassword(password);
  const result = await query(
    'INSERT INTO system_users (email, username, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?, ?)',
    [email, email, first_name, last_name, phone, hashed_password]
  );
  return await fnUserGet(result.insertId);
}

async function fnUserUpdate(id, { email, first_name, last_name, phone, default_role_id }) {
  const updates = [];
  const params = [];

  if (email !== undefined) {
    updates.push('email = ?');
    params.push(email);
  }
  if (first_name !== undefined) {
    updates.push('first_name = ?');
    params.push(first_name);
  }
  if (last_name !== undefined) {
    updates.push('last_name = ?');
    params.push(last_name);
  }
  if (phone !== undefined) {
    updates.push('phone = ?');
    params.push(phone);
  }

  if (default_role_id !== undefined) {
    // Check if user has this role
    const hasRole = await query(
      'SELECT id FROM system_user_roles WHERE user_id = ? AND role_id = ?',
      [Number(id), Number(default_role_id)]
    );
    if (hasRole.length === 0) throw new Error("Default role must be one of the user's roles");

    updates.push('default_role_id = ?');
    params.push(Number(default_role_id));
  }

  if (updates.length === 0) throw new Error("No fields to update");

  params.push(Number(id));
  await query(
    `UPDATE system_users SET ${updates.join(', ')} WHERE id = ?`,
    params
  );

  return await fnUserGet(id);
}

async function fnUserDelete(id) {
  const result = await query('DELETE FROM system_users WHERE id = ?', [Number(id)]);
  if (result.affectedRows === 0) throw new Error("User not found");
  return true;
}

module.exports = {
  fnUserList,
  fnUserGet,
  fnUserCreate,
  fnUserUpdate,
  fnUserDelete,
};
