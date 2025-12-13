import { queryOne, queryMany } from '../../utils/db.util.js'
import { jwtGenerateFormAccess } from '../../utils/jwt.util.js'

export async function createForm(name, description, createdBy) {
  const result = await queryMany(
    'INSERT INTO forms (name, description, created_by) VALUES (?, ?, ?)',
    [name, description, createdBy]
  )
  return result.insertId
}

export async function findFormById(formId) {
  const form = await queryOne('SELECT * FROM forms WHERE id = ?', [formId])
  if (!form) return null

  const fields = await queryMany(
    'SELECT * FROM form_fields WHERE form_id = ? ORDER BY field_order ASC',
    [formId]
  )

  for (const field of fields) {
    if (['select', 'checkbox', 'radio'].includes(field.field_type)) {
      field.options = await queryMany(
        'SELECT * FROM field_options WHERE field_id = ? ORDER BY option_order ASC',
        [field.id]
      )
    }

    if (field.field_type === 'table_select') {
      field.tableSource = await queryOne(
        'SELECT * FROM field_table_sources WHERE field_id = ?',
        [field.id]
      )
    }
  }

  const access = await queryMany(
    'SELECT * FROM form_access WHERE form_id = ?',
    [formId]
  )

  return { ...form, fields, access }
}

export async function findAllForms(userId) {
  return await queryMany(
    `SELECT DISTINCT f.*
     FROM forms f
     LEFT JOIN form_access fa ON f.id = fa.form_id
     LEFT JOIN user_roles ur ON fa.access_type = 'role' AND fa.access_value = ur.role_id
     LEFT JOIN group_users gu ON fa.access_type = 'group' AND fa.access_value = gu.group_id
     WHERE f.created_by = ?
        OR ur.user_id = ?
        OR gu.user_id = ?
        OR fa.access_type = 'link'
     ORDER BY f.created_at DESC`,
    [userId, userId, userId]
  )
}

export async function updateForm(formId, { name, description, isActive }) {
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

  if (updates.length === 0) return null

  params.push(formId)
  await queryMany(`UPDATE forms SET ${updates.join(', ')} WHERE id = ?`, params)
  return await findFormById(formId)
}

export async function deleteForm(formId) {
  const result = await queryMany('DELETE FROM forms WHERE id = ?', [formId])
  return result.affectedRows > 0
}

export async function addFieldToForm(formId, fieldData) {
  const { fieldKey, label, fieldType, mode, isRequired, fieldOrder, options, tableSource } = fieldData

  const result = await queryMany(
    'INSERT INTO form_fields (form_id, field_key, label, field_type, mode, is_required, field_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [formId, fieldKey, label, fieldType, mode || 'question', isRequired || false, fieldOrder || 0]
  )

  const fieldId = result.insertId

  if (options && ['select', 'checkbox', 'radio'].includes(fieldType)) {
    for (let i = 0; i < options.length; i++) {
      const opt = options[i]
      await queryMany(
        'INSERT INTO field_options (field_id, value, label, score, option_order) VALUES (?, ?, ?, ?, ?)',
        [fieldId, opt.value, opt.label, opt.score || 0, i]
      )
    }
  }

  if (tableSource && fieldType === 'table_select') {
    await queryMany(
      'INSERT INTO field_table_sources (field_id, source_table, source_value_column, source_label_column) VALUES (?, ?, ?, ?)',
      [fieldId, tableSource.table, tableSource.valueColumn, tableSource.labelColumn]
    )
  }

  return fieldId
}

export async function assignAccessToForm(formId, accessType, accessValue, expiresAt) {
  await queryMany(
    'INSERT INTO form_access (form_id, access_type, access_value, expires_at) VALUES (?, ?, ?, ?)',
    [formId, accessType, accessValue, expiresAt]
  )
  return true
}

export async function generateFormLink(formId, expiresAt = null) {
  const token = jwtGenerateFormAccess(formId, expiresAt)

  await queryMany(
    'INSERT INTO form_access (form_id, access_type, access_value, expires_at) VALUES (?, ?, ?, ?)',
    [formId, 'link', token, expiresAt]
  )

  return token
}

export async function checkFormAccess(formId, userId = null, token = null) {
  if (userId) {
    const form = await queryOne(
      'SELECT id FROM forms WHERE id = ? AND created_by = ?',
      [formId, userId]
    )
    if (form) return true

    const roleAccess = await queryMany(
      `SELECT fa.id
       FROM form_access fa
       JOIN user_roles ur ON fa.access_value = ur.role_id
       WHERE fa.form_id = ? AND fa.access_type = 'role' AND ur.user_id = ?`,
      [formId, userId]
    )
    if (roleAccess.length > 0) return true

    const groupAccess = await queryMany(
      `SELECT fa.id
       FROM form_access fa
       JOIN group_users gu ON fa.access_value = gu.group_id
       WHERE fa.form_id = ? AND fa.access_type = 'group' AND gu.user_id = ?`,
      [formId, userId]
    )
    if (groupAccess.length > 0) return true
  }

  if (token) {
    const tokenAccess = await queryOne(
      `SELECT id FROM form_access
       WHERE form_id = ? AND access_type = 'link' AND access_value = ?
       AND (expires_at IS NULL OR expires_at > NOW())`,
      [formId, token]
    )
    if (tokenAccess) return true
  }

  return false
}

export async function submitFormResponse(formId, userId, answers) {
  const result = await queryMany(
    'INSERT INTO form_responses (form_id, user_id, status) VALUES (?, ?, ?)',
    [formId, userId, 'submitted']
  )

  const responseId = result.insertId
  let totalScore = 0

  for (const answer of answers) {
    let score = 0

    const field = await queryOne(
      'SELECT field_type FROM form_fields WHERE id = ?',
      [answer.fieldId]
    )

    if (field && ['select', 'radio', 'checkbox'].includes(field.field_type)) {
      const option = await queryOne(
        'SELECT score FROM field_options WHERE field_id = ? AND value = ?',
        [answer.fieldId, answer.value]
      )
      if (option) {
        score = option.score
      }
    }

    await queryMany(
      'INSERT INTO form_response_values (response_id, field_id, value, score) VALUES (?, ?, ?, ?)',
      [responseId, answer.fieldId, answer.value, score]
    )

    totalScore += score
  }

  await queryMany(
    'UPDATE form_responses SET total_score = ? WHERE id = ?',
    [totalScore, responseId]
  )

  return responseId
}

export async function findFormResponses(formId) {
  const responses = await queryMany(
    `SELECT r.*, u.username, u.email
     FROM form_responses r
     LEFT JOIN users u ON r.user_id = u.id
     WHERE r.form_id = ?
     ORDER BY r.created_at DESC`,
    [formId]
  )

  for (const response of responses) {
    response.values = await queryMany(
      `SELECT rv.*, ff.field_key, ff.label
       FROM form_response_values rv
       JOIN form_fields ff ON rv.field_id = ff.id
       WHERE rv.response_id = ?`,
      [response.id]
    )
  }

  return responses
}

export default {
  createForm,
  findFormById,
  findAllForms,
  updateForm,
  deleteForm,
  addFieldToForm,
  assignAccessToForm,
  generateFormLink,
  checkFormAccess,
  submitFormResponse,
  findFormResponses
}
