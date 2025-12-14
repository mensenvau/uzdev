import { queryMany, queryOne } from "../../utils/db.util.js";

export async function fnFormList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;
  let sql =
    "SELECT f.id, f.name, f.description, f.is_active, f.created_at, u.username as created_by_name FROM system_forms f LEFT JOIN system_users u ON f.created_by = u.id";
  const params = [];

  if (search) {
    sql += " WHERE f.name LIKE ? OR f.description LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY f.created_at DESC LIMIT ${safe_limit} OFFSET ${offset}`;

  const forms = await queryMany(sql, params);

  const count_sql = search ? "SELECT COUNT(*) as total FROM system_forms WHERE name LIKE ? OR description LIKE ?" : "SELECT COUNT(*) as total FROM system_forms";
  const count_params = search ? [`%${search}%`, `%${search}%`] : [];
  const [{ total }] = await queryMany(count_sql, count_params);

  return { limit: safe_limit, page: safe_page, total, forms };
}

export async function fnFormGet(id) {
  const form = await queryOne("SELECT f.id, f.name, f.description, f.is_active, f.created_at, u.username as created_by_name FROM system_forms f LEFT JOIN system_users u ON f.created_by = u.id WHERE f.id = ?", [id]);

  if (!form) throw new Error("Form not found");

  const fields = await queryMany("SELECT id, field_key, label, field_type, mode, is_required, field_order FROM system_form_fields WHERE form_id = ? ORDER BY field_order", [id]);

  for (const field of fields) {
    if (["select", "checkbox", "radio", "score"].includes(field.field_type)) {
      field.options = await queryMany("SELECT id, value, label, score, option_order FROM system_form_field_options WHERE field_id = ? ORDER BY option_order", [field.id]);
    }

    if (field.field_type === "table_select") {
      const table_source = await queryOne("SELECT source_table, source_value_column, source_label_column FROM system_form_field_table_sources WHERE field_id = ?", [field.id]);
      field.table_source = table_source;
    }
  }

  const access = await queryMany("SELECT id, access_type, access_value, expires_at FROM system_form_access WHERE form_id = ?", [id]);

  return { ...form, fields, access };
}

export async function fnFormCreate(name, description, created_by) {
  const result = await queryMany("INSERT INTO system_forms (name, description, created_by) VALUES (?, ?, ?)", [name, description || null, created_by]);
  return await fnFormGet(result.insertId);
}

export async function fnFormUpdate(id, { name, description, is_active }) {
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

  if (is_active !== undefined) {
    updates.push("is_active = ?");
    params.push(is_active);
  }

  if (updates.length === 0) throw new Error("No fields to update");

  params.push(id);
  await queryMany(`UPDATE system_forms SET ${updates.join(", ")} WHERE id = ?`, params);
  return await fnFormGet(id);
}

export async function fnFormDelete(id) {
  const result = await queryMany("DELETE FROM system_forms WHERE id = ?", [id]);
  if (result.affectedRows === 0) throw new Error("Form not found");
  return true;
}

export async function fnFormAddAccess(form_id, access_type, access_value, expires_at) {
  const result = await queryMany("INSERT INTO system_form_access (form_id, access_type, access_value, expires_at) VALUES (?, ?, ?, ?)", [form_id, access_type, access_value, expires_at || null]);
  return { id: result.insertId, form_id, access_type, access_value, expires_at };
}

export async function fnFormSubmit(form_id, user_id, answers, token) {
  const form = await queryOne("SELECT id FROM system_forms WHERE id = ? AND is_active = TRUE", [form_id]);
  if (!form) throw new Error("Form not found or inactive");

  const response_result = await queryMany("INSERT INTO system_form_responses (form_id, user_id, status) VALUES (?, ?, ?)", [form_id, user_id, "submitted"]);
  const response_id = response_result.insertId;

  let total_score = 0;

  for (const answer of answers) {
    const field = await queryOne("SELECT field_type FROM system_form_fields WHERE id = ?", [answer.field_id]);

    if (!field) continue;

    let score = 0;
    if (["select", "radio", "checkbox", "score"].includes(field.field_type)) {
      const option = await queryOne("SELECT score FROM system_form_field_options WHERE field_id = ? AND value = ?", [answer.field_id, answer.value]);
      score = option ? option.score : 0;
    }

    total_score += score;
    await queryMany("INSERT INTO system_form_response_values (response_id, field_id, value, score) VALUES (?, ?, ?, ?)", [response_id, answer.field_id, answer.value, score]);
  }

  await queryMany("UPDATE system_form_responses SET total_score = ? WHERE id = ?", [total_score, response_id]);

  return { response_id, total_score };
}

export async function fnFormListTables(prefix = "system_") {
  const likePattern = `${prefix}%`;
  return queryMany(
    `SELECT TABLE_NAME as name, TABLE_TYPE as type
     FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME LIKE ?
       AND TABLE_TYPE IN ('BASE TABLE', 'VIEW')
     ORDER BY TABLE_NAME`,
    [likePattern]
  );
}

export async function fnFormListTableColumns(table_name, prefix = "system_") {
  if (!table_name || !table_name.startsWith(prefix)) {
    throw new Error("Invalid table name");
  }

  return queryMany(
    `SELECT COLUMN_NAME as name, DATA_TYPE as type
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
     ORDER BY ORDINAL_POSITION`,
    [table_name]
  );
}
