import asyncHandler from '../../utils/async.util.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'
import {
  groupList,
  groupGet,
  groupCreate,
  groupUpdate,
  groupDelete,
  groupAddUser,
  groupRemoveUser
} from './group.service.js'

export const list = asyncHandler(async (req, res) => {
  const { limit, offset } = req.query
  const result = await groupList({
    limit: limit ? parseInt(limit) : 50,
    offset: offset ? parseInt(offset) : 0
  })
  return sendSuccess(res, result, 'Groups retrieved successfully')
})

export const get = asyncHandler(async (req, res) => {
  const { id } = req.params
  const group = await groupGet(parseInt(id))
  return sendSuccess(res, group, 'Group retrieved successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { name, description, userIds } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const group = await groupCreate({ name, description, userIds })
  return sendSuccess(res, group, 'Group created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  if (!name) {
    return sendError(res, 'Name is required', 400)
  }

  const group = await groupUpdate(parseInt(id), { name, description })
  return sendSuccess(res, group, 'Group updated successfully')
})

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params
  await groupDelete(parseInt(id))
  return sendSuccess(res, null, 'Group deleted successfully')
})

export const addUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  if (!userId) {
    return sendError(res, 'User ID is required', 400)
  }

  await groupAddUser(parseInt(id), parseInt(userId))
  return sendSuccess(res, null, 'User added successfully')
})

export const removeUser = asyncHandler(async (req, res) => {
  const { id, userId } = req.params
  await groupRemoveUser(parseInt(id), parseInt(userId))
  return sendSuccess(res, null, 'User removed successfully')
})

export default {
  list,
  get,
  create,
  update,
  remove,
  addUser,
  removeUser
}
