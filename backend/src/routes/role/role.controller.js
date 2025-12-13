import asyncHandler from '../../utils/async.util.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'
import {
  roleList,
  roleGet,
  roleCreate,
  roleUpdate,
  roleDelete,
  roleAssignPolicy,
  roleRemovePolicy
} from './role.service.js'

export const list = asyncHandler(async (req, res) => {
  const { limit, offset } = req.query
  const result = await roleList({
    limit: limit ? parseInt(limit) : 50,
    offset: offset ? parseInt(offset) : 0
  })
  return sendSuccess(res, result, 'Roles retrieved successfully')
})

export const get = asyncHandler(async (req, res) => {
  const { id } = req.params
  const role = await roleGet(parseInt(id))
  return sendSuccess(res, role, 'Role retrieved successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { name, description, policyIds } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const role = await roleCreate({ name, description, policyIds })
  return sendSuccess(res, role, 'Role created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const role = await roleUpdate(parseInt(id), { name, description })
  return sendSuccess(res, role, 'Role updated successfully')
})

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params
  await roleDelete(parseInt(id))
  return sendSuccess(res, null, 'Role deleted successfully')
})

export const assignPolicy = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { policyId } = req.body

  if (!policyId) {
    return sendError(res, 'Policy ID is required', 400)
  }

  await roleAssignPolicy(parseInt(id), parseInt(policyId))
  return sendSuccess(res, null, 'Policy assigned successfully')
})

export const removePolicy = asyncHandler(async (req, res) => {
  const { id, policyId } = req.params
  await roleRemovePolicy(parseInt(id), parseInt(policyId))
  return sendSuccess(res, null, 'Policy removed successfully')
})

export default {
  list,
  get,
  create,
  update,
  remove,
  assignPolicy,
  removePolicy
}
