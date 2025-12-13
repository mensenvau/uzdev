import { query, queryOne, transaction } from '../../config/db.config.js'
import { generateFormAccessToken } from '../../utils/jwt.util.js'

/**
 * Create a new form
 */
export async function formCreate({ name, description, createdBy }) {
  const result = await query(
    'INSERT INTO forms (name, description, created_by) VALUES (?, ?, ?)',
    [name, description, createdBy]
  )
  return await formGet(result.insertId)
}

/**
 * Get form by ID with all fields
 */
export async function formGet(formId) {
  const form = await queryOne('SELECT * FROM forms WHERE id = ?', [formId])
  if (!form) throw new Error('Form not found')

  // Get fields
  const fields = await query(
    'SELECT * FROM form_fields WHERE form_id = ? ORDER BY field_order ASC',
    [formId]
  )

  // Get options for each field
  for (const field of fields) {
    if (['select', 'checkbox', 'radio'].includes(field.field_type)) {
      field.options = await query(
        'SELECT * FROM field_options WHERE field_id = ? ORDER BY option_order ASC',
        [field.id]
      )
    }

    // Get table source if table_select
    if (field.field_type === 'table_select') {
      field.tableSource = await queryOne(
        'SELECT * FROM field_table_sources WHERE field_id = ?',
        [field.id]
      )
    }
  }

  // Get access control
  const access = await query(
    'SELECT * FROM form_access WHERE form_id = ?',
    [formId]
  )

  return { ...form, fields, access }
}

/**
 * List all forms
 */
export async function formList({ userId }) {
  // Get forms accessible by user (via role or group) or created by user
  const forms = await query(
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

  return forms
}

/**
 * Update form
 */
export async function formUpdate(formId, { name, description, isActive }) {
  const updates = []
  const params = []

  if (name !== undefined) {
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

  params.push(formId)
  await query(`UPDATE forms SET ${updates.join(', ')} WHERE id = ?`, params)

  return await formGet(formId)
}

/**
 * Delete form
 */
export async function formDelete(formId) {
  const result = await query('DELETE FROM forms WHERE id = ?', [formId])
  if (result.affectedRows === 0) throw new Error('Form not found')
  return true
}

/**
 * Add field to form
 */
export async function formAddField({
  formId,
  fieldKey,
  label,
  fieldType,
  mode,
  isRequired,
  fieldOrder,
  options,
  tableSource
}) {
  const result = await transaction(async (conn) => {
    // Insert field
    const [fieldResult] = await conn.execute(
      `INSERT INTO form_fields
       (form_id, field_key, label, field_type, mode, is_required, field_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [formId, fieldKey, label, fieldType, mode || 'question', isRequired || false, fieldOrder || 0]
    )

    const fieldId = fieldResult.insertId

    // Insert options if provided
    if (options && ['select', 'checkbox', 'radio'].includes(fieldType)) {
      for (let i = 0; i < options.length; i++) {
        const opt = options[i]
        await conn.execute(
          `INSERT INTO field_options
           (field_id, value, label, score, option_order)
           VALUES (?, ?, ?, ?, ?)`,
          [fieldId, opt.value, opt.label, opt.score || 0, i]
        )
      }
    }

    // Insert table source if provided
    if (tableSource && fieldType === 'table_select') {
      await conn.execute(
        `INSERT INTO field_table_sources
         (field_id, source_table, source_value_column, source_label_column)
         VALUES (?, ?, ?, ?)`,
        [fieldId, tableSource.table, tableSource.valueColumn, tableSource.labelColumn]
      )
    }

    return fieldId
  })

  return result
}

/**
 * Assign access to form
 */
export async function formAssignAccess({ formId, accessType, accessValue, expiresAt }) {
  await query(
    'INSERT INTO form_access (form_id, access_type, access_value, expires_at) VALUES (?, ?, ?, ?)',
    [formId, accessType, accessValue, expiresAt]
  )
  return true
}

/**
 * Generate public link for form
 */
export async function formGenerateLink(formId, expiresAt = null) {
  const token = generateFormAccessToken(formId, expiresAt)

  await query(
    'INSERT INTO form_access (form_id, access_type, access_value, expires_at) VALUES (?, ?, ?, ?)',
    [formId, 'link', token, expiresAt]
  )

  return token
}

/**
 * Check if user has access to form
 */
export async function formCheckAccess(formId, userId = null, token = null) {
  // Check if user is creator
  if (userId) {
    const form = await queryOne(
      'SELECT id FROM forms WHERE id = ? AND created_by = ?',
      [formId, userId]
    )
    if (form) return true

    // Check role access
    const roleAccess = await query(
      `SELECT fa.id
       FROM form_access fa
       JOIN user_roles ur ON fa.access_value = ur.role_id
       WHERE fa.form_id = ? AND fa.access_type = 'role' AND ur.user_id = ?`,
      [formId, userId]
    )
    if (roleAccess.length > 0) return true

    // Check group access
    const groupAccess = await query(
      `SELECT fa.id
       FROM form_access fa
       JOIN group_users gu ON fa.access_value = gu.group_id
       WHERE fa.form_id = ? AND fa.access_type = 'group' AND gu.user_id = ?`,
      [formId, userId]
    )
    if (groupAccess.length > 0) return true
  }

  // Check token access
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

/**
 * Submit form response
 */
export async function formSubmitResponse({ formId, userId, answers }) {
  return await transaction(async (conn) => {
    // Create response
    const [responseResult] = await conn.execute(
      'INSERT INTO form_responses (form_id, user_id, status) VALUES (?, ?, ?)',
      [formId, userId, 'submitted']
    )

    const responseId = responseResult.insertId
    let totalScore = 0

    // Insert answers and calculate score
    for (const answer of answers) {
      let score = 0

      // Get field info
      const [fields] = await conn.execute(
        'SELECT field_type FROM form_fields WHERE id = ?',
        [answer.fieldId]
      )

      if (fields.length > 0 && ['select', 'radio', 'checkbox'].includes(fields[0].field_type)) {
        // Get score from option
        const [options] = await conn.execute(
          'SELECT score FROM field_options WHERE field_id = ? AND value = ?',
          [answer.fieldId, answer.value]
        )
        if (options.length > 0) {
          score = options[0].score
        }
      }

      // Insert response value
      await conn.execute(
        `INSERT INTO form_response_values
         (response_id, field_id, value, score)
         VALUES (?, ?, ?, ?)`,
        [responseId, answer.fieldId, answer.value, score]
      )

      totalScore += score
    }

    // Update total score
    await conn.execute(
      'UPDATE form_responses SET total_score = ? WHERE id = ?',
      [totalScore, responseId]
    )

    return responseId
  })
}

/**
 * Get form responses
 */
export async function formGetResponses(formId) {
  const responses = await query(
    `SELECT r.*, u.username, u.email
     FROM form_responses r
     LEFT JOIN users u ON r.user_id = u.id
     WHERE r.form_id = ?
     ORDER BY r.created_at DESC`,
    [formId]
  )

  // Get values for each response
  for (const response of responses) {
    response.values = await query(
      `SELECT rv.*, ff.field_key, ff.label
       FROM form_response_values rv
       JOIN form_fields ff ON rv.field_id = ff.id
       WHERE rv.response_id = ?`,
      [response.id]
    )
  }

  return responses
}

/**
 * Calculate/recalculate score for response
 */
export async function formCalculateScore(responseId) {
  const values = await query(
    `SELECT rv.score
     FROM form_response_values rv
     WHERE rv.response_id = ?`,
    [responseId]
  )

  const totalScore = values.reduce((sum, v) => sum + v.score, 0)

  await query(
    'UPDATE form_responses SET total_score = ? WHERE id = ?',
    [totalScore, responseId]
  )

  return totalScore
}

export default {
  formCreate,
  formGet,
  formList,
  formUpdate,
  formDelete,
  formAddField,
  formAssignAccess,
  formGenerateLink,
  formCheckAccess,
  formSubmitResponse,
  formGetResponses,
  formCalculateScore
}
