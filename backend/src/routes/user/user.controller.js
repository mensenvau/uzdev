import asyncHandler from '../../utils/async.util.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'
import {
  userList,
  userGet,
  userCreate,
  userUpdate,
  userDelete,
  userAssignRole,
  userRemoveRole
} from './user.service.js'

export const list = asyncHandler(async (req, res) => {
  const { limit, offset } = req.query
  const result = await userList({
    limit: limit ? parseInt(limit) : 50,
    offset: offset ? parseInt(offset) : 0
  })
  return sendSuccess(res, result, 'Users retrieved successfully')
})

export const get = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await userGet(parseInt(id))
  return sendSuccess(res, user, 'User retrieved successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { email, username, password, roleIds } = req.body

  if (!email || !username || !password) {
    return sendError(res, 'Email, username, and password are required', 400)
  }

  const user = await userCreate({ email, username, password, roleIds })
  return sendSuccess(res, user, 'User created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { email, username } = req.body

  if (!email || !username) {
    return sendError(res, 'Email and username are required', 400)
  }

  const user = await userUpdate(parseInt(id), { email, username })
  return sendSuccess(res, user, 'User updated successfully')
})

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params
  await userDelete(parseInt(id))
  return sendSuccess(res, null, 'User deleted successfully')
})

export const assignRole = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { roleId } = req.body

  if (!roleId) {
    return sendError(res, 'Role ID is required', 400)
  }

  await userAssignRole(parseInt(id), parseInt(roleId))
  return sendSuccess(res, null, 'Role assigned successfully')
})

export const removeRole = asyncHandler(async (req, res) => {
  const { id, roleId } = req.params
  await userRemoveRole(parseInt(id), parseInt(roleId))
  return sendSuccess(res, null, 'Role removed successfully')
})

export default {
  list,
  get,
  create,
  update,
  remove,
  assignRole,
  removeRole
}
