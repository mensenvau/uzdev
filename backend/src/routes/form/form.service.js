import { prisma } from "../../utils/db.util.js";

const OPTION_FIELD_TYPES = ["select", "checkbox", "radio", "score"];
const TABLE_FIELD_TYPE = "table_select";

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

async function loadFieldsWithMeta(form_id, client = prisma) {
  const fields = await client.formField.findMany({
    where: { form_id: Number(form_id) },
    orderBy: { field_order: "asc" },
    include: {
      options: { orderBy: { option_order: "asc" } },
      tableSource: true,
    },
  });

  return fields.map((field) => ({
    ...field,
    settings: normalizeSettings(field.settings),
    table_source: field.tableSource || null,
  }));
}

async function fnFormUpsertFields(form_id, fields = [], client) {
  const safe_fields = Array.isArray(fields) ? fields : [];
  const saved_field_ids = [];
  const seen_keys = new Set();

  for (let index = 0; index < safe_fields.length; index++) {
    const field = safe_fields[index];
    const field_key = (field.field_key || `field_${index + 1}`).trim();
    if (!field_key) throw new Error("Field key is required");
    if (seen_keys.has(field_key)) throw new Error(`Duplicate field key: ${field_key}`);
    seen_keys.add(field_key);

    const label = (field.label || "Untitled question").trim();
    const field_type = field.field_type;
    const mode = field.mode === "check" ? "check" : "question";
    const is_required = Boolean(field.is_required);
    const field_order = Number.isFinite(Number(field.field_order)) ? Number(field.field_order) : index;
    const normalizedSettings = normalizeSettings(field.settings);
    const settings = Object.keys(normalizedSettings).length > 0 ? JSON.stringify(normalizedSettings) : null;

    const saved_field = await client.formField.upsert({
      where: { id: field.id ?? 0 },
      update: { field_key, label, field_type, mode, is_required, field_order, settings },
      create: { form_id: Number(form_id), field_key, label, field_type, mode, is_required, field_order, settings },
    });
    const field_id = saved_field.id;

    saved_field_ids.push(field_id);

    if (OPTION_FIELD_TYPES.includes(field_type)) {
      const options = Array.isArray(field.options) ? field.options : [];
      const saved_option_ids = [];
      for (let option_index = 0; option_index < options.length; option_index++) {
        const option = options[option_index];
        const option_value = option.value ?? `${field_key}_option_${option_index + 1}`;
        const option_label = option.label || option_value;
        const option_score = Number.isFinite(Number(option.score)) ? Number(option.score) : 0;
        const option_order = Number.isFinite(Number(option.option_order)) ? Number(option.option_order) : option_index;

        const saved_option = await client.formFieldOption.upsert({
          where: { id: option.id ?? 0 },
          update: { value: option_value, label: option_label, score: option_score, option_order },
          create: { field_id: field_id, value: option_value, label: option_label, score: option_score, option_order },
        });
        saved_option_ids.push(saved_option.id);
      }

      await client.formFieldOption.deleteMany({
        where: saved_option_ids.length ? { field_id: field_id, id: { notIn: saved_option_ids } } : { field_id: field_id },
      });
    } else {
      await client.formFieldOption.deleteMany({ where: { field_id: field_id } });
    }

    if (field_type === TABLE_FIELD_TYPE) {
      const source = field.table_source;
      if (source?.source_table && source?.source_value_column && source?.source_label_column) {
        await client.formFieldTableSource.upsert({
          where: { field_id: fieldId },
          update: {
            source_table: source.source_table,
            source_value_column: source.source_value_column,
            source_label_column: source.source_label_column,
          },
          create: {
            field_id: field_id,
            source_table: source.source_table,
            source_value_column: source.source_value_column,
            source_label_column: source.source_label_column,
          },
        });
      } else {
        await client.formFieldTableSource.deleteMany({ where: { field_id: field_id } });
      }
    } else {
      await client.formFieldTableSource.deleteMany({ where: { field_id: field_id } });
    }
  }

  await client.formField.deleteMany({
    where: saved_field_ids.length ? { form_id: Number(form_id), id: { notIn: saved_field_ids } } : { form_id: Number(form_id) },
  });
}

export async function fnFormList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const skip = (safe_page - 1) * safe_limit;

  const where = search ? { OR: [{ name: { contains: search } }, { description: { contains: search } }] } : {};

  const [forms, total] = await Promise.all([
    prisma.form.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip,
      take: safe_limit,
      include: {
        _count: { select: { fields: true } },
        creator: { select: { username: true } },
      },
    }),
    prisma.form.count({ where }),
  ]);

  return {
    limit: safe_limit,
    page: safe_page,
    total,
    forms: forms.map((f) => ({
      id: f.id,
      name: f.name,
      description: f.description,
      is_active: f.is_active,
      created_at: f.created_at,
      created_by_name: f.creator?.username || null,
      field_count: f._count.fields,
    })),
  };
}

export async function fnFormGet(id, client = prisma) {
  const form = await client.form.findUnique({
    where: { id: Number(id) },
    include: {
      creator: { select: { username: true } },
      access: true,
      fields: {
        orderBy: { field_order: "asc" },
        include: { options: { orderBy: { option_order: "asc" } }, tableSource: true },
      },
    },
  });

  if (!form) throw new Error("Form not found");

  return {
    id: form.id,
    name: form.name,
    description: form.description,
    is_active: form.is_active,
    created_at: form.created_at,
    created_by_name: form.creator?.username || null,
    fields: form.fields.map((f) => ({
      ...f,
      settings: normalizeSettings(f.settings),
      table_source: f.tableSource || null,
    })),
    access: form.access,
  };
}

export async function fnFormCreate(name, description, created_by, fields = []) {
  return prisma.$transaction(async (tx) => {
    const created = await tx.form.create({
      data: { name, description, created_by },
    });
    if (Array.isArray(fields) && fields.length > 0) {
      await fnFormUpsertFields(created.id, fields, tx);
    }
    return fnFormGet(created.id, tx);
  });
}

export async function fnFormUpdate(id, { name, description, is_active, fields }) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.form.findUnique({ where: { id: Number(id) } });
    if (!existing) throw new Error("Form not found");

    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (is_active !== undefined) data.is_active = is_active;

    if (Object.keys(data).length > 0) {
      await tx.form.update({ where: { id: Number(id) }, data });
    }

    if (Array.isArray(fields)) {
      await fnFormUpsertFields(id, fields, tx);
    }

    if (Object.keys(data).length === 0 && !Array.isArray(fields)) throw new Error("No fields to update");

    return fnFormGet(id, tx);
  });
}

export async function fnFormDelete(id) {
  const deleted = await prisma.form.delete({ where: { id: Number(id) } }).catch(() => null);
  if (!deleted) throw new Error("Form not found");
  return true;
}

export async function fnFormAddAccess(form_id, access_type, access_value, expires_at) {
  const access = await prisma.formAccess.create({
    data: { form_id: Number(form_id), access_type, access_value, expires_at: expires_at || null },
  });
  return access;
}

export async function fnFormSubmit(form_id, user_id, answers) {
  const form = await prisma.form.findUnique({ where: { id: Number(form_id) } });
  if (!form || form.is_active === false) throw new Error("Form not found or inactive");

  const fields = await loadFieldsWithMeta(form_id);
  if (!fields.length) throw new Error("Form has no fields to submit");

  const answer_list = Array.isArray(answers) ? answers : [];
  const answers_by_field = new Map();
  for (const answer of answer_list) {
    if (answer?.field_id !== undefined && answer?.field_id !== null) {
      answers_by_field.set(Number(answer.field_id), answer);
    }
  }
  const option_lookup = {};
  for (const field of fields.filter((f) => OPTION_FIELD_TYPES.includes(f.field_type))) {
    const option_map = new Map();
    for (const option of field.options || []) {
      option_map.set(String(option.value), Number(option.score) || 0);
    }
    option_lookup[field.id] = option_map;
  }

  for (const field of fields) {
    const answer = answers_by_field.get(Number(field.id));
    const value = answer?.value;
    const hasValue = Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && String(value).trim() !== "";
    if (field.is_required && !hasValue) {
      throw new Error(`Field "${field.label}" is required`);
    }
  }

  return prisma.$transaction(async (tx) => {
    const response = await tx.formResponse.create({
      data: {
        form_id: Number(form_id),
        user_id: user_id ? Number(user_id) : null,
        status: "submitted",
      },
    });

    let total_score = 0;

    for (const field of fields) {
      const answer = answers_by_field.get(Number(field.id));
      if (!answer) continue;
      const rawValue = answer.value;
      const values = Array.isArray(rawValue) ? rawValue : rawValue === undefined || rawValue === null ? [] : [rawValue];
      let fieldScore = 0;

      if (OPTION_FIELD_TYPES.includes(field.field_type)) {
        const lookup = option_lookup[field.id] || new Map();
        const normalizedValues =
          field.field_type === "checkbox" && typeof rawValue === "string"
            ? rawValue
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean)
            : values;
        for (const val of normalizedValues) {
          const key = String(val);
          if (!lookup.has(key)) {
            throw new Error(`Invalid option selected for "${field.label}"`);
          }
          fieldScore += lookup.get(key);
        }
      }

      total_score += fieldScore;
      const storedValue = Array.isArray(rawValue) ? JSON.stringify(rawValue) : rawValue !== undefined && rawValue !== null ? String(rawValue) : "";
      await tx.formResponseValue.create({
        data: { response_id: response.id, field_id: field.id, value: storedValue, score: fieldScore },
      });
    }

    await tx.formResponse.update({ where: { id: response.id }, data: { total_score: total_score } });

    return { response_id: response.id, total_score };
  });
}

export async function fnFormResponses(form_id) {
  return prisma.formResponse.findMany({
    where: { form_id: Number(form_id) },
    orderBy: { created_at: "desc" },
  });
}

export async function fnFormListTables(prefix = "system_") {
  const likePattern = `${prefix}%`;
  return prisma.$queryRawUnsafe(
    `SELECT TABLE_NAME as name, TABLE_TYPE as type
     FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME LIKE ?
       AND TABLE_TYPE IN ('BASE TABLE', 'VIEW')
     ORDER BY TABLE_NAME`,
    likePattern
  );
}

export async function fnFormListTableColumns(table_name, prefix = "system_") {
  if (!table_name || !table_name.startsWith(prefix)) {
    throw new Error("Invalid table name");
  }

  return prisma.$queryRawUnsafe(
    `SELECT COLUMN_NAME as name, DATA_TYPE as type
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
     ORDER BY ORDINAL_POSITION`,
    table_name
  );
}
