import asyncHandler from '../../utils/async.util.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'
import {
  policyList,
  policyGet,
  policyCreate,
  policyUpdate,
  policyDelete
} from './policy.service.js'

export const list = asyncHandler(async (req, res) => {
  const { limit, offset } = req.query
  const result = await policyList({
    limit: limit ? parseInt(limit) : 50,
    offset: offset ? parseInt(offset) : 0
  })
  return sendSuccess(res, result, 'Policies retrieved successfully')
})

export const get = asyncHandler(async (req, res) => {
  const { id } = req.params
  const policy = await policyGet(parseInt(id))
  return sendSuccess(res, policy, 'Policy retrieved successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const policy = await policyCreate({ name, description })
  return sendSuccess(res, policy, 'Policy created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const policy = await policyUpdate(parseInt(id), { name, description })
  return sendSuccess(res, policy, 'Policy updated successfully')
})

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params
  await policyDelete(parseInt(id))
  return sendSuccess(res, null, 'Policy deleted successfully')
})

export default {
  list,
  get,
  create,
  update,
  remove
}
