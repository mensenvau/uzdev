const { queryMany } = require("../../utils/db");

const OPTION_FIELD_TYPES = new Set(["select", "checkbox", "radio", "score"]);
const TABLE_FIELD_TYPES = new Set(["column"]);
const NON_ANSWER_FIELD_TYPES = new Set(["markdown", "page_break"]);

function parseStoredValue(value) {
  if (value === null || value === undefined) return value;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeSettings(settings) {
  if (!settings) return {};
  if (typeof settings === "string") {
    try {
      return JSON.parse(settings);
    } catch {
      return {};
    }
  }
  return settings;
}

function buildPlaceholders(items) {
  return items.map(() => "?").join(", ");
}

function sanitizeIdentifier(value, prefix = "") {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }
  const normalized = value.trim();
  if (!/^[a-zA-Z0-9_]+$/.test(normalized)) {
    return "";
  }
  if (prefix && !normalized.toLowerCase().startsWith(prefix.toLowerCase())) {
    return "";
  }
  return normalized;
}

async function loadFieldsWithMeta(form_id, client) {
  const fields = await queryMany(
    `SELECT id, form_id, field_key, label, field_type, mode, is_required, field_order, settings
     FROM system_form_fields
     WHERE form_id = ?
     ORDER BY field_order ASC, id ASC`,
    [Number(form_id)]
  );

  if (!fields.length) {
    return [];
  }

  const field_ids = fields.map((field) => field.id);
  const option_rows = await queryMany(
    `SELECT id, field_id, value, label, score, option_order
     FROM system_form_field_options
     WHERE field_id IN (${buildPlaceholders(field_ids)})
     ORDER BY option_order ASC, id ASC`,
    field_ids
  );
  const source_rows = await queryMany(
    `SELECT field_id, source_table, source_value_column, source_label_column
     FROM system_form_field_table_sources
     WHERE field_id IN (${buildPlaceholders(field_ids)})`,
    field_ids
  );

  const options_by_field = new Map();
  option_rows.forEach((option) => {
    if (!options_by_field.has(option.field_id)) {
      options_by_field.set(option.field_id, []);
    }
    options_by_field.get(option.field_id).push(option);
  });

  const source_by_field = new Map();
  source_rows.forEach((source) => {
    source_by_field.set(source.field_id, source);
  });

  return fields.map((field) => ({
    ...field,
    settings: normalizeSettings(field.settings),
    options: options_by_field.get(field.id) || [],
    table_source: source_by_field.get(field.id) || null,
  }));
}

async function upsertFields(form_id, fields = [], client) {
  const safe_fields = Array.isArray(fields) ? fields : [];
  const saved_field_ids = [];
  const seen_keys = new Set();

  for (let index = 0; index < safe_fields.length; index++) {
    const field = safe_fields[index] || {};
    const field_key = (field.field_key || `field_${index + 1}`).trim();
    if (!field_key) throw new Error("Field key is required");
    if (seen_keys.has(field_key)) throw new Error(`Duplicate field key: ${field_key}`);
    seen_keys.add(field_key);

    const label = (field.label || "Untitled question").trim();
    const field_type = field.field_type;
    if (!field_type) throw new Error("Field type is required");
    const mode = field.mode === "check" ? "check" : "question";
    const is_required = NON_ANSWER_FIELD_TYPES.has(field_type) ? false : Boolean(field.is_required);
    const field_order = Number.isFinite(Number(field.field_order)) ? Number(field.field_order) : index;
    const settings_object = normalizeSettings(field.settings);
    const settings = Object.keys(settings_object).length ? JSON.stringify(settings_object) : null;

    let field_id = null;

    if (field.id) {
      const existing_field = await queryMany(`SELECT id FROM system_form_fields WHERE id = ? AND form_id = ?`, [field.id, Number(form_id)]);

      if (existing_field.length > 0) {
        await queryMany(
          `UPDATE system_form_fields
           SET field_key = ?, label = ?, field_type = ?, mode = ?, is_required = ?, field_order = ?, settings = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [field_key, label, field_type, mode, is_required, field_order, settings, field.id]
        );
        field_id = field.id;
      }
    }

    if (!field_id) {
      const insert_result = await queryMany(
        `INSERT INTO system_form_fields (form_id, field_key, label, field_type, mode, is_required, field_order, settings)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [Number(form_id), field_key, label, field_type, mode, is_required, field_order, settings]
      );
      field_id = insert_result.insertId;
    }

    saved_field_ids.push(field_id);

    if (OPTION_FIELD_TYPES.has(field_type)) {
      const options = Array.isArray(field.options) ? field.options : [];
      const saved_option_ids = [];

      for (let option_index = 0; option_index < options.length; option_index++) {
        const option = options[option_index] || {};
        const option_value = option.value ?? `${field_key}_option_${option_index + 1}`;
        const option_label = option.label || option_value;
        const option_score = Number.isFinite(Number(option.score)) ? Number(option.score) : 0;
        const option_order = Number.isFinite(Number(option.option_order)) ? Number(option.option_order) : option_index;

        let option_id = null;

        if (option.id) {
          const existing_option = await queryMany(`SELECT id FROM system_form_field_options WHERE id = ? AND field_id = ?`, [option.id, field_id]);

          if (existing_option.length > 0) {
            await queryMany(
              `UPDATE system_form_field_options
               SET value = ?, label = ?, score = ?, option_order = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`,
              [option_value, option_label, option_score, option_order, option.id]
            );
            option_id = option.id;
          }
        }

        if (!option_id) {
          const option_result = await queryMany(
            `INSERT INTO system_form_field_options (field_id, value, label, score, option_order)
             VALUES (?, ?, ?, ?, ?)`,
            [field_id, option_value, option_label, option_score, option_order]
          );
          option_id = option_result.insertId;
        }

        saved_option_ids.push(option_id);
      }

      if (saved_option_ids.length) {
        await queryMany(`DELETE FROM system_form_field_options WHERE field_id = ? AND id NOT IN (${buildPlaceholders(saved_option_ids)})`, [field_id, ...saved_option_ids]);
      } else {
        await queryMany(`DELETE FROM system_form_field_options WHERE field_id = ?`, [field_id]);
      }
    } else {
      await queryMany(`DELETE FROM system_form_field_options WHERE field_id = ?`, [field_id]);
    }

    if (TABLE_FIELD_TYPES.has(field_type)) {
      const source = field.table_source;
      const has_source = source?.source_table && source?.source_value_column && source?.source_label_column;

      if (has_source) {
        const existing_source = await queryMany(`SELECT id FROM system_form_field_table_sources WHERE field_id = ?`, [field_id]);

        if (existing_source.length > 0) {
          await queryMany(
            `UPDATE system_form_field_table_sources
             SET source_table = ?, source_value_column = ?, source_label_column = ?, updated_at = CURRENT_TIMESTAMP
             WHERE field_id = ?`,
            [source.source_table, source.source_value_column, source.source_label_column, field_id]
          );
        } else {
          await queryMany(
            `INSERT INTO system_form_field_table_sources (field_id, source_table, source_value_column, source_label_column)
             VALUES (?, ?, ?, ?)`,
            [field_id, source.source_table, source.source_value_column, source.source_label_column]
          );
        }
      } else {
        await queryMany(`DELETE FROM system_form_field_table_sources WHERE field_id = ?`, [field_id]);
      }
    } else {
      await queryMany(`DELETE FROM system_form_field_table_sources WHERE field_id = ?`, [field_id]);
    }
  }

  if (saved_field_ids.length) {
    await queryMany(`DELETE FROM system_form_fields WHERE form_id = ? AND id NOT IN (${buildPlaceholders(saved_field_ids)})`, [Number(form_id), ...saved_field_ids]);
  } else {
    await queryMany(`DELETE FROM system_form_fields WHERE form_id = ?`, [Number(form_id)]);
  }
}

async function fnFormList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  const where_params = search ? [`%${search}%`, `%${search}%`] : [];
  const main_params = [...where_params];
  const count_params = [...where_params];
  const where_clause = search ? "WHERE f.name LIKE ? OR f.description LIKE ?" : "";

  const formsPromise = queryMany(
    `SELECT
       f.id,
       f.name,
       f.description,
       f.is_active,
       f.created_at,
       u.username AS created_by_name,
       COALESCE(fc.field_count, 0) AS field_count
     FROM system_forms f
     LEFT JOIN system_users u ON u.id = f.created_by
     LEFT JOIN (
       SELECT form_id, COUNT(*) AS field_count
       FROM system_form_fields
       GROUP BY form_id
     ) fc ON fc.form_id = f.id
     ${where_clause}
     ORDER BY f.created_at DESC
     LIMIT ? OFFSET ?`,
    [...main_params, safe_limit, offset]
  );

  const countPromise = queryMany(`SELECT COUNT(*) AS total FROM system_forms f ${where_clause}`, count_params);

  const [forms, count_res] = await Promise.all([formsPromise, countPromise]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: count_res[0]?.total || 0,
    forms,
  };
}

async function fnFormGet(id, client) {
  const form_rows = await queryMany(
    `SELECT f.id, f.name, f.description, f.is_active, f.created_at, u.username AS created_by_name
     FROM system_forms f
     LEFT JOIN system_users u ON u.id = f.created_by
     WHERE f.id = ?`,
    [Number(id)]
  );

  if (!form_rows.length) {
    throw new Error("Form not found");
  }

  const access = await queryMany(
    `SELECT id, form_id, access_type, access_value, expires_at, created_at, updated_at
     FROM system_form_access
     WHERE form_id = ?
     ORDER BY id ASC`,
    [Number(id)]
  );

  const fields = await loadFieldsWithMeta(id, client);

  return {
    ...form_rows[0],
    fields,
    access,
  };
}

async function fnFormGetPublic(id, token) {
  const access_rows = await queryMany(
    `SELECT access_type, access_value, expires_at
     FROM system_form_access
     WHERE form_id = ?`,
    [Number(id)]
  );

  const now = new Date();
  const isPublic = access_rows.some((row) => {
    if (row.expires_at && new Date(row.expires_at) < now) return false;
    return row.access_type === "public";
  });
  const hasLink = access_rows.some((row) => {
    if (row.expires_at && new Date(row.expires_at) < now) return false;
    return row.access_type === "link" && token && row.access_value === token;
  });

  if (!isPublic && !hasLink) {
    throw new Error("Form is not public");
  }

  const form_rows = await queryMany(
    `SELECT f.id, f.name, f.description, f.is_active, f.created_at
     FROM system_forms f
     WHERE f.id = ?`,
    [Number(id)]
  );

  if (!form_rows.length) {
    throw new Error("Form not found");
  }

  if (form_rows[0].is_active === 0) {
    throw new Error("Form is inactive");
  }

  const fields = await loadFieldsWithMeta(id, null);

  return {
    ...form_rows[0],
    fields,
  };
}

async function fnFormCreate(name, description, created_by, fields = []) {
  const created = await queryMany(`INSERT INTO system_forms (name, description, created_by) VALUES (?, ?, ?)`, [name, description || null, created_by ? Number(created_by) : null]);

  if (Array.isArray(fields) && fields.length > 0) {
    await upsertFields(created.insertId, fields, null);
  }

  return fnFormGet(created.insertId, null);
}

async function fnFormUpdate(id, { name, description, is_active, fields }) {
  const existing = await queryMany(`SELECT id FROM system_forms WHERE id = ?`, [Number(id)]);

  if (!existing.length) {
    throw new Error("Form not found");
  }

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

  if (is_active !== undefined) {
    updates.push("is_active = ?");
    update_params.push(Boolean(is_active));
  }

  if (updates.length > 0) {
    update_params.push(Number(id));
    await queryMany(`UPDATE system_forms SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, update_params);
  }

  if (Array.isArray(fields)) {
    await upsertFields(id, fields, null);
  }

  if (updates.length === 0 && !Array.isArray(fields)) {
    throw new Error("No fields to update");
  }

  return fnFormGet(id, null);
}

async function fnFormDelete(id) {
  const result = await queryMany(`DELETE FROM system_forms WHERE id = ?`, [Number(id)]);
  if (result.affectedRows === 0) {
    throw new Error("Form not found");
  }
  return true;
}

async function fnFormAddAccess(form_id, access_type, access_value, expires_at) {
  const result = await queryMany(
    `INSERT INTO system_form_access (form_id, access_type, access_value, expires_at)
     VALUES (?, ?, ?, ?)`,
    [Number(form_id), access_type, access_value, expires_at || null]
  );

  const rows = await queryMany(
    `SELECT id, form_id, access_type, access_value, expires_at, created_at, updated_at
     FROM system_form_access
     WHERE id = ?`,
    [result.insertId]
  );
  return rows[0];
}

async function fnFormSubmit(form_id, user_id, answers) {
  const form_rows = await queryMany(`SELECT id, is_active FROM system_forms WHERE id = ?`, [Number(form_id)]);

  if (!form_rows.length || form_rows[0].is_active === 0) {
    throw new Error("Form not found or inactive");
  }

  const fields = await loadFieldsWithMeta(form_id);
  if (!fields.length) {
    throw new Error("Form has no fields to submit");
  }

  const answer_list = Array.isArray(answers) ? answers : [];
  const answers_by_field = new Map();
  for (const answer of answer_list) {
    if (answer?.field_id !== undefined && answer?.field_id !== null) {
      answers_by_field.set(Number(answer.field_id), answer);
    }
  }

  const option_lookup = {};
  for (const field of fields.filter((field) => OPTION_FIELD_TYPES.has(field.field_type))) {
    const option_map = new Map();
    for (const option of field.options || []) {
      option_map.set(String(option.value), Number(option.score) || 0);
    }
    option_lookup[field.id] = option_map;
  }

  for (const field of fields) {
    if (NON_ANSWER_FIELD_TYPES.has(field.field_type)) continue;

    const answer = answers_by_field.get(Number(field.id));
    const value = answer?.value;
    const has_value = Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && String(value).trim() !== "";
    if (field.is_required && !has_value) {
      throw new Error(`Field "${field.label}" is required`);
    }
  }

  const response_result = await queryMany(
    `INSERT INTO system_form_responses (form_id, user_id, status)
     VALUES (?, ?, ?)`,
    [Number(form_id), user_id ? Number(user_id) : null, "submitted"]
  );

  const response_id = response_result.insertId;
  let total_score = 0;

  for (const field of fields) {
    if (NON_ANSWER_FIELD_TYPES.has(field.field_type)) continue;

    const answer = answers_by_field.get(Number(field.id));
    if (!answer) continue;

    const raw_value = answer.value;
    const values = Array.isArray(raw_value) ? raw_value : raw_value === undefined || raw_value === null ? [] : [raw_value];
    let field_score = 0;

    if (OPTION_FIELD_TYPES.has(field.field_type)) {
      const lookup = option_lookup[field.id] || new Map();
      const normalized_values =
        field.field_type === "checkbox" && typeof raw_value === "string"
          ? raw_value
              .split(",")
              .map((value) => value.trim())
              .filter(Boolean)
          : values;

      for (const value of normalized_values) {
        const key = String(value);
        if (!lookup.has(key)) {
          throw new Error(`Invalid option selected for "${field.label}"`);
        }
        field_score += lookup.get(key);
      }
    }

    total_score += field_score;
    const stored_value = Array.isArray(raw_value) ? JSON.stringify(raw_value) : raw_value !== undefined && raw_value !== null ? String(raw_value) : "";

    await queryMany(
      `INSERT INTO system_form_response_values (response_id, field_id, value, score)
       VALUES (?, ?, ?, ?)`,
      [response_id, field.id, stored_value, field_score]
    );
  }

  await queryMany(`UPDATE system_form_responses SET total_score = ? WHERE id = ?`, [total_score, response_id]);

  return { response_id, total_score };
}

async function fnFormResponses(form_id) {
  return queryMany(
    `SELECT id, form_id, user_id, total_score, status, created_at, updated_at
     FROM system_form_responses
     WHERE form_id = ?
     ORDER BY created_at DESC`,
    [Number(form_id)]
  );
}

async function fnFormResponseDetail(form_id, response_id) {
  const response_rows = await queryMany(
    `SELECT id, form_id, user_id, total_score, status, created_at, updated_at
     FROM system_form_responses
     WHERE id = ? AND form_id = ?`,
    [Number(response_id), Number(form_id)]
  );

  if (!response_rows.length) {
    throw new Error("Response not found");
  }

  const fields = await loadFieldsWithMeta(form_id, null);
  const value_rows = await queryMany(
    `SELECT field_id, value, score
     FROM system_form_response_values
     WHERE response_id = ?`,
    [Number(response_id)]
  );

  const valueMap = new Map();
  value_rows.forEach((row) => {
    valueMap.set(Number(row.field_id), {
      value: parseStoredValue(row.value),
      score: row.score,
    });
  });

  const answers = fields.map((field) => {
    const value = valueMap.get(Number(field.id));
    return {
      field_id: field.id,
      label: field.label,
      field_type: field.field_type,
      value: value?.value ?? null,
      score: value?.score ?? null,
    };
  });

  return {
    response: response_rows[0],
    answers,
  };
}

async function fnFormSearchColumns(search = "") {
  const schema_name = process.env.DB_NAME || "core_app";
  const like_value = `%${search}%`;
  return queryMany(
    `SELECT table_name, column_name, data_type
     FROM information_schema.columns
     WHERE table_schema = ?
       AND table_name LIKE 'vw_public_%'
       AND (table_name LIKE ? OR column_name LIKE ?)
     ORDER BY table_name, column_name
     LIMIT 25`,
    [schema_name, like_value, like_value]
  );
}

async function fnFormColumnValues(table_name, value_column, label_column) {
  const safe_table = sanitizeIdentifier(table_name, "vw_public_");
  const safe_value_column = sanitizeIdentifier(value_column);
  const safe_label_column = sanitizeIdentifier(label_column);

  console.log(table_name, safe_table, safe_label_column, safe_value_column);
  if (!safe_table || !safe_value_column || !safe_label_column) {
    return [];
  }

  const rows = await queryMany(
    `SELECT DISTINCT ?? AS value, ?? AS label
     FROM ??
     ORDER BY label
     LIMIT 100`,
    [safe_value_column, safe_label_column, safe_table]
  );
  console.log(rows);
  return rows;
}

module.exports = {
  fnFormList,
  fnFormGet,
  fnFormCreate,
  fnFormUpdate,
  fnFormDelete,
  fnFormGetPublic,
  fnFormAddAccess,
  fnFormSubmit,
  fnFormResponses,
  fnFormResponseDetail,
  fnFormSearchColumns,
  fnFormColumnValues,
};
