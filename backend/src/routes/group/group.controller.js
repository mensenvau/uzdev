import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess, sendError, sendValidationError } from '../../utils/response.util.js'
import * as groupService from './group.service.js'

export const list = asyncHandler(async (req, res) => {
  const groups = await groupService.findAllGroups()
  sendSuccess(res, { groups })
})

export const get = asyncHandler(async (req, res) => {
  const group = await groupService.findGroupById(req.params.id)
  if (!group) {
    return sendError(res, 'Group not found', 404)
  }
  sendSuccess(res, { group })
})

export const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (!name) {
    return sendValidationError(res, { name: 'Name is required' })
  }

  const groupId = await groupService.createGroup(name, description)
  const group = await groupService.findGroupById(groupId)
  sendSuccess(res, { group }, 'Group created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const group = await groupService.updateGroup(req.params.id, req.body)
  if (!group) {
    return sendError(res, 'Group not found or no fields to update', 400)
  }
  sendSuccess(res, { group }, 'Group updated successfully')
})

export const deleteGroup = asyncHandler(async (req, res) => {
  const deleted = await groupService.deleteGroup(req.params.id)
  if (!deleted) {
    return sendError(res, 'Group not found', 404)
  }
  sendSuccess(res, null, 'Group deleted successfully')
})

export const addUser = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body

  if (!groupId || !userId) {
    return sendValidationError(res, {
      groupId: !groupId ? 'Group ID is required' : undefined,
      userId: !userId ? 'User ID is required' : undefined
    })
  }

  await groupService.addUserToGroup(groupId, userId)
  sendSuccess(res, null, 'User added to group successfully')
})

export const removeUser = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body

  if (!groupId || !userId) {
    return sendValidationError(res, {
      groupId: !groupId ? 'Group ID is required' : undefined,
      userId: !userId ? 'User ID is required' : undefined
    })
  }

  await groupService.removeUserFromGroup(groupId, userId)
  sendSuccess(res, null, 'User removed from group successfully')
})

export default { list, get, create, update, deleteGroup, addUser, removeUser }
