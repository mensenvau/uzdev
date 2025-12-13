import { queryMany, queryOne, poolConnection } from '../../utils/db.util.js'

export async function formList({ limit = 50, offset = 0 }) {
  const forms = await queryMany(
    `SELECT f.id, f.name, f.description, f.is_active, f.created_at, f.updated_at,
     u.username as created_by_username,
     COUNT(DISTINCT fr.id) as response_count
     FROM forms f
     LEFT JOIN users u ON f.created_by = u.id
     LEFT JOIN form_responses fr ON f.id = fr.form_id
     GROUP BY f.id
     ORDER BY f.created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  const total = await queryOne('SELECT COUNT(*) as count FROM forms')

  return {
    forms,
    total: total.count,
    limit,
    offset
  }
}

export async function formGet(formId) {
  const form = await queryOne(
    `SELECT f.id, f.name, f.description, f.is_active, f.created_by, f.created_at, f.updated_at
     FROM forms f
     WHERE f.id = ?`,
    [formId]
  )

  if (!form) {
    throw new Error('Form not found')
  }

  const fields = await queryMany(
    `SELECT ff.id, ff.field_key, ff.label, ff.field_type, ff.mode, ff.is_required, ff.field_order
     FROM form_fields ff
     WHERE ff.form_id = ?
     ORDER BY ff.field_order`,
    [formId]
  )

  for (const field of fields) {
    if (['select', 'checkbox', 'radio'].includes(field.field_type)) {
      field.options = await queryMany(
        `SELECT id, value, label, score, option_order
         FROM field_options
         WHERE field_id = ?
         ORDER BY option_order`,
        [field.id]
      )
    }

    if (field.field_type === 'table_select') {
      field.tableSource = await queryOne(
        `SELECT source_table, source_value_column, source_label_column
         FROM field_table_sources
         WHERE field_id = ?`,
        [field.id]
      )
    }
  }

  const access = await queryMany(
    `SELECT id, access_type, access_value, expires_at
     FROM form_access
     WHERE form_id = ?`,
    [formId]
  )

  return {
    ...form,
    fields,
    access
  }
}

export async function formCreate({ name, description, createdBy, fields = [], access = [] }) {
  const conn = await poolConnection.getConnection()
  try {
    await conn.beginTransaction()

    const [formResult] = await conn.execute(
      'INSERT INTO forms (name, description, created_by, is_active) VALUES (?, ?, ?, TRUE)',
      [name, description, createdBy]
    )

    const formId = formResult.insertId

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const [fieldResult] = await conn.execute(
        `INSERT INTO form_fields (form_id, field_key, label, field_type, mode, is_required, field_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [formId, field.field_key, field.label, field.field_type, field.mode || 'question', field.is_required || false, i]
      )

      const fieldId = fieldResult.insertId

      if (field.options && field.options.length > 0) {
        for (let j = 0; j < field.options.length; j++) {
          const option = field.options[j]
          await conn.execute(
            `INSERT INTO field_options (field_id, value, label, score, option_order)
             VALUES (?, ?, ?, ?, ?)`,
            [fieldId, option.value, option.label, option.score || 0, j]
          )
        }
      }

      if (field.tableSource) {
        await conn.execute(
          `INSERT INTO field_table_sources (field_id, source_table, source_value_column, source_label_column)
           VALUES (?, ?, ?, ?)`,
          [fieldId, field.tableSource.source_table, field.tableSource.source_value_column, field.tableSource.source_label_column]
        )
      }
    }

    for (const acc of access) {
      await conn.execute(
        `INSERT INTO form_access (form_id, access_type, access_value, expires_at)
         VALUES (?, ?, ?, ?)`,
        [formId, acc.access_type, acc.access_value, acc.expires_at || null]
      )
    }

    await conn.commit()

    return await formGet(formId)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function formUpdate(formId, { name, description, is_active }) {
  const form = await queryOne('SELECT id FROM forms WHERE id = ?', [formId])

  if (!form) {
    throw new Error('Form not found')
  }

  await queryMany(
    'UPDATE forms SET name = ?, description = ?, is_active = ? WHERE id = ?',
    [name, description, is_active, formId]
  )

  return await formGet(formId)
}

export async function formDelete(formId) {
  const form = await queryOne('SELECT id FROM forms WHERE id = ?', [formId])

  if (!form) {
    throw new Error('Form not found')
  }

  await queryMany('DELETE FROM forms WHERE id = ?', [formId])

  return true
}

export async function formResponseCreate({ formId, userId, values }) {
  const form = await queryOne('SELECT id FROM forms WHERE id = ? AND is_active = TRUE', [formId])

  if (!form) {
    throw new Error('Form not found or inactive')
  }

  const conn = await poolConnection.getConnection()
  try {
    await conn.beginTransaction()

    const [responseResult] = await conn.execute(
      'INSERT INTO form_responses (form_id, user_id, status) VALUES (?, ?, ?)',
      [formId, userId || null, 'draft']
    )

    const responseId = responseResult.insertId

    let totalScore = 0

    for (const val of values) {
      await conn.execute(
        `INSERT INTO form_response_values (response_id, field_id, value, score)
         VALUES (?, ?, ?, ?)`,
        [responseId, val.field_id, val.value, val.score || 0]
      )
      totalScore += val.score || 0
    }

    await conn.execute(
      'UPDATE form_responses SET total_score = ? WHERE id = ?',
      [totalScore, responseId]
    )

    await conn.commit()

    return await formResponseGet(responseId)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function formResponseGet(responseId) {
  const response = await queryOne(
    `SELECT fr.id, fr.form_id, fr.user_id, fr.total_score, fr.status, fr.created_at, fr.updated_at,
     f.name as form_name,
     u.username as user_username
     FROM form_responses fr
     JOIN forms f ON fr.form_id = f.id
     LEFT JOIN users u ON fr.user_id = u.id
     WHERE fr.id = ?`,
    [responseId]
  )

  if (!response) {
    throw new Error('Response not found')
  }

  const values = await queryMany(
    `SELECT frv.id, frv.field_id, frv.value, frv.score,
     ff.field_key, ff.label
     FROM form_response_values frv
     JOIN form_fields ff ON frv.field_id = ff.id
     WHERE frv.response_id = ?`,
    [responseId]
  )

  return {
    ...response,
    values
  }
}

export async function formResponseList({ formId, limit = 50, offset = 0 }) {
  const responses = await queryMany(
    `SELECT fr.id, fr.user_id, fr.total_score, fr.status, fr.created_at,
     u.username as user_username
     FROM form_responses fr
     LEFT JOIN users u ON fr.user_id = u.id
     WHERE fr.form_id = ?
     ORDER BY fr.created_at DESC
     LIMIT ? OFFSET ?`,
    [formId, limit, offset]
  )

  const total = await queryOne(
    'SELECT COUNT(*) as count FROM form_responses WHERE form_id = ?',
    [formId]
  )

  return {
    responses,
    total: total.count,
    limit,
    offset
  }
}

export async function formResponseUpdateStatus(responseId, status) {
  const response = await queryOne('SELECT id FROM form_responses WHERE id = ?', [responseId])

  if (!response) {
    throw new Error('Response not found')
  }

  await queryMany(
    'UPDATE form_responses SET status = ? WHERE id = ?',
    [status, responseId]
  )

  return await formResponseGet(responseId)
}

export default {
  formList,
  formGet,
  formCreate,
  formUpdate,
  formDelete,
  formResponseCreate,
  formResponseGet,
  formResponseList,
  formResponseUpdateStatus
}
