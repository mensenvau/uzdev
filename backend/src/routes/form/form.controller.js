import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess, sendError, sendValidationError, sendForbidden } from '../../utils/response.util.js'
import * as formService from './form.service.js'

export const list = asyncHandler(async (req, res) => {
  const forms = await formService.findAllForms(req.user.id)
  sendSuccess(res, { forms })
})

export const get = asyncHandler(async (req, res) => {
  const formId = req.params.id
  const token = req.query.token

  const hasAccess = await formService.checkFormAccess(formId, req.user?.id, token)
  if (!hasAccess) {
    return sendForbidden(res, 'You do not have access to this form')
  }

  const form = await formService.findFormById(formId)
  if (!form) {
    return sendError(res, 'Form not found', 404)
  }
  sendSuccess(res, { form })
})

export const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (!name) {
    return sendValidationError(res, { name: 'Name is required' })
  }

  const formId = await formService.createForm(name, description, req.user.id)
  const form = await formService.findFormById(formId)
  sendSuccess(res, { form }, 'Form created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const form = await formService.updateForm(req.params.id, req.body)
  if (!form) {
    return sendError(res, 'Form not found or no fields to update', 400)
  }
  sendSuccess(res, { form }, 'Form updated successfully')
})

export const deleteForm = asyncHandler(async (req, res) => {
  const deleted = await formService.deleteForm(req.params.id)
  if (!deleted) {
    return sendError(res, 'Form not found', 404)
  }
  sendSuccess(res, null, 'Form deleted successfully')
})

export const addField = asyncHandler(async (req, res) => {
  const formId = req.params.id
  const fieldId = await formService.addFieldToForm(formId, req.body)
  sendSuccess(res, { fieldId }, 'Field added successfully', 201)
})

export const assignAccess = asyncHandler(async (req, res) => {
  const formId = req.params.id
  const { accessType, accessValue, expiresAt } = req.body

  if (!accessType || !accessValue) {
    return sendValidationError(res, {
      accessType: !accessType ? 'Access type is required' : undefined,
      accessValue: !accessValue ? 'Access value is required' : undefined
    })
  }

  await formService.assignAccessToForm(formId, accessType, accessValue, expiresAt)
  sendSuccess(res, null, 'Access assigned successfully')
})

export const generateLink = asyncHandler(async (req, res) => {
  const formId = req.params.id
  const { expiresAt } = req.body

  const token = await formService.generateFormLink(formId, expiresAt)
  sendSuccess(res, { token }, 'Link generated successfully')
})

export const submitResponse = asyncHandler(async (req, res) => {
  const formId = req.params.id
  const { answers, token } = req.body

  if (!answers || !Array.isArray(answers)) {
    return sendValidationError(res, { answers: 'Answers array is required' })
  }

  const hasAccess = await formService.checkFormAccess(formId, req.user?.id, token)
  if (!hasAccess) {
    return sendForbidden(res, 'You do not have access to this form')
  }

  const responseId = await formService.submitFormResponse(formId, req.user?.id, answers)
  sendSuccess(res, { responseId }, 'Response submitted successfully', 201)
})

export const getResponses = asyncHandler(async (req, res) => {
  const formId = req.params.id
  const responses = await formService.findFormResponses(formId)
  sendSuccess(res, { responses })
})

export default {
  list,
  get,
  create,
  update,
  deleteForm,
  addField,
  assignAccess,
  generateLink,
  submitResponse,
  getResponses
}
