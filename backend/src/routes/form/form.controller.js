import asyncHandler from '../../utils/async.util.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'
import {
  formList,
  formGet,
  formCreate,
  formUpdate,
  formDelete,
  formResponseCreate,
  formResponseGet,
  formResponseList,
  formResponseUpdateStatus
} from './form.service.js'

export const list = asyncHandler(async (req, res) => {
  const { limit, offset } = req.query
  const result = await formList({
    limit: limit ? parseInt(limit) : 50,
    offset: offset ? parseInt(offset) : 0
  })
  return sendSuccess(res, result, 'Forms retrieved successfully')
})

export const get = asyncHandler(async (req, res) => {
  const { id } = req.params
  const form = await formGet(parseInt(id))
  return sendSuccess(res, form, 'Form retrieved successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { name, description, fields, access } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const form = await formCreate({
    name,
    description,
    createdBy: req.user.id,
    fields,
    access
  })
  return sendSuccess(res, form, 'Form created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, description, is_active } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const form = await formUpdate(parseInt(id), { name, description, is_active })
  return sendSuccess(res, form, 'Form updated successfully')
})

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params
  await formDelete(parseInt(id))
  return sendSuccess(res, null, 'Form deleted successfully')
})

export const createResponse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { values } = req.body

  if (!values || !Array.isArray(values)) {
    return sendError(res, 'Values array is required', 400)
  }

  const response = await formResponseCreate({
    formId: parseInt(id),
    userId: req.user?.id,
    values
  })
  return sendSuccess(res, response, 'Response created successfully', 201)
})

export const getResponse = asyncHandler(async (req, res) => {
  const { responseId } = req.params
  const response = await formResponseGet(parseInt(responseId))
  return sendSuccess(res, response, 'Response retrieved successfully')
})

export const listResponses = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { limit, offset } = req.query
  const result = await formResponseList({
    formId: parseInt(id),
    limit: limit ? parseInt(limit) : 50,
    offset: offset ? parseInt(offset) : 0
  })
  return sendSuccess(res, result, 'Responses retrieved successfully')
})

export const updateResponseStatus = asyncHandler(async (req, res) => {
  const { responseId } = req.params
  const { status } = req.body

  if (!status) {
    return sendError(res, 'Status is required', 400)
  }

  const response = await formResponseUpdateStatus(parseInt(responseId), status)
  return sendSuccess(res, response, 'Response status updated successfully')
})

export default {
  list,
  get,
  create,
  update,
  remove,
  createResponse,
  getResponse,
  listResponses,
  updateResponseStatus
}
