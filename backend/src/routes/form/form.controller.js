import {
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
  formGetResponses
} from './form.service.js'
import { sendSuccess, sendError, sendForbidden } from '../../utils/response.util.js'

export async function create(req, res) {
  try {
    const { name, description } = req.body
    const form = await formCreate({
      name,
      description,
      createdBy: req.user.id
    })
    return sendSuccess(res, form, 'Form created successfully', 201)
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function get(req, res) {
  try {
    const formId = req.params.id
    const token = req.query.token

    // Check access
    const hasAccess = await formCheckAccess(formId, req.user?.id, token)
    if (!hasAccess) {
      return sendForbidden(res, 'You do not have access to this form')
    }

    const form = await formGet(formId)
    return sendSuccess(res, form)
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function list(req, res) {
  try {
    const forms = await formList({ userId: req.user.id })
    return sendSuccess(res, forms)
  } catch (error) {
    return sendError(res, error.message)
  }
}

export async function update(req, res) {
  try {
    const form = await formUpdate(req.params.id, req.body)
    return sendSuccess(res, form, 'Form updated successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function deleteForm(req, res) {
  try {
    await formDelete(req.params.id)
    return sendSuccess(res, null, 'Form deleted successfully')
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function addField(req, res) {
  try {
    const formId = req.params.id
    const fieldId = await formAddField({ formId, ...req.body })
    return sendSuccess(res, { fieldId }, 'Field added successfully', 201)
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function assignAccess(req, res) {
  try {
    const formId = req.params.id
    const { accessType, accessValue, expiresAt } = req.body

    await formAssignAccess({ formId, accessType, accessValue, expiresAt })
    return sendSuccess(res, null, 'Access assigned successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function generateLink(req, res) {
  try {
    const formId = req.params.id
    const { expiresAt } = req.body

    const token = await formGenerateLink(formId, expiresAt)
    return sendSuccess(res, { token }, 'Link generated successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function submitResponse(req, res) {
  try {
    const formId = req.params.id
    const { answers, token } = req.body

    // Check access
    const hasAccess = await formCheckAccess(formId, req.user?.id, token)
    if (!hasAccess) {
      return sendForbidden(res, 'You do not have access to this form')
    }

    const responseId = await formSubmitResponse({
      formId,
      userId: req.user?.id,
      answers
    })

    return sendSuccess(res, { responseId }, 'Response submitted successfully', 201)
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function getResponses(req, res) {
  try {
    const formId = req.params.id
    const responses = await formGetResponses(formId)
    return sendSuccess(res, responses)
  } catch (error) {
    return sendError(res, error.message)
  }
}

export default {
  create,
  get,
  list,
  update,
  deleteForm,
  addField,
  assignAccess,
  generateLink,
  submitResponse,
  getResponses
}
