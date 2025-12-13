import { queryMany, queryOne } from '../../utils/db.util.js'

export async function formList({ limit = 10, page = 1, search = '' }) {
  const offset = (page - 1) * limit
  let sql = 'SELECT f.id, f.name, f.description, f.is_active, f.created_at, u.username as created_by_name FROM forms f LEFT JOIN users u ON f.created_by = u.id'
  const params = []

  if (search) {
    sql += ' WHERE f.name LIKE ? OR f.description LIKE ?'
    params.push(`%${search}%`, `%${search}%`)
  }

  sql += ' ORDER BY f.created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const forms = await queryMany(sql, params)

  const countSql = search
    ? 'SELECT COUNT(*) as total FROM forms WHERE name LIKE ? OR description LIKE ?'
    : 'SELECT COUNT(*) as total FROM forms'
  const countParams = search ? [`%${search}%`, `%${search}%`] : []
  const [{ total }] = await queryMany(countSql, countParams)

  return { limit, page, total, forms }
}

export async function formGet(id) {
  const form = await queryOne(
    'SELECT f.id, f.name, f.description, f.is_active, f.created_at, u.username as created_by_name FROM forms f LEFT JOIN users u ON f.created_by = u.id WHERE f.id = ?',
    [id]
  )

  if (!form) throw new Error('Form not found')

  const fields = await queryMany(
    'SELECT id, field_key, label, field_type, mode, is_required, field_order FROM form_fields WHERE form_id = ? ORDER BY field_order',
    [id]
  )

  for (const field of fields) {
    if (['select', 'checkbox', 'radio', 'score'].includes(field.field_type)) {
      field.options = await queryMany(
        'SELECT id, value, label, score, option_order FROM field_options WHERE field_id = ? ORDER BY option_order',
        [field.id]
      )
    }

    if (field.field_type === 'table_select') {
      const tableSource = await queryOne(
        'SELECT source_table, source_value_column, source_label_column FROM field_table_sources WHERE field_id = ?',
        [field.id]
      )
      field.tableSource = tableSource
    }
  }

  const access = await queryMany(
    'SELECT id, access_type, access_value, expires_at FROM form_access WHERE form_id = ?',
    [id]
  )

  return { ...form, fields, access }
}

export async function formCreate(name, description, createdBy) {
  const result = await queryMany(
    'INSERT INTO forms (name, description, created_by) VALUES (?, ?, ?)',
    [name, description || null, createdBy]
  )
  return await formGet(result.insertId)
}

export async function formUpdate(id, { name, description, isActive }) {
  const updates = []
  const params = []

  if (name) {
    updates.push('name = ?')
    params.push(name)
  }

  if (description !== undefined) {
    updates.push('description = ?')
    params.push(description)
  }

  if (isActive !== undefined) {
    updates.push('is_active = ?')
    params.push(isActive)
  }

  if (updates.length === 0) throw new Error('No fields to update')

  params.push(id)
  await queryMany(`UPDATE forms SET ${updates.join(', ')} WHERE id = ?`, params)
  return await formGet(id)
}

export async function formDelete(id) {
  const result = await queryMany('DELETE FROM forms WHERE id = ?', [id])
  if (result.affectedRows === 0) throw new Error('Form not found')
  return true
}

export async function formAddAccess(formId, accessType, accessValue, expiresAt) {
  const result = await queryMany(
    'INSERT INTO form_access (form_id, access_type, access_value, expires_at) VALUES (?, ?, ?, ?)',
    [formId, accessType, accessValue, expiresAt || null]
  )
  return { id: result.insertId, formId, accessType, accessValue, expiresAt }
}

export async function formSubmit(formId, userId, answers, token) {
  const form = await queryOne('SELECT id FROM forms WHERE id = ? AND is_active = TRUE', [formId])
  if (!form) throw new Error('Form not found or inactive')

  const responseResult = await queryMany(
    'INSERT INTO form_responses (form_id, user_id, status) VALUES (?, ?, ?)',
    [formId, userId, 'submitted']
  )
  const responseId = responseResult.insertId

  let totalScore = 0

  for (const answer of answers) {
    const field = await queryOne(
      'SELECT field_type FROM form_fields WHERE id = ?',
      [answer.fieldId]
    )

    if (!field) continue

    let score = 0
    if (['select', 'radio', 'checkbox', 'score'].includes(field.field_type)) {
      const option = await queryOne(
        'SELECT score FROM field_options WHERE field_id = ? AND value = ?',
        [answer.fieldId, answer.value]
      )
      score = option ? option.score : 0
    }

    totalScore += score

    await queryMany(
      'INSERT INTO form_response_values (response_id, field_id, value, score) VALUES (?, ?, ?, ?)',
      [responseId, answer.fieldId, answer.value, score]
    )
  }

  await queryMany(
    'UPDATE form_responses SET total_score = ? WHERE id = ?',
    [totalScore, responseId]
  )

  return { responseId, totalScore }
}
