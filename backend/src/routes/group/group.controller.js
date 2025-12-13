import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess } from '../../utils/response.util.js'
import * as groupService from './group.service.js'

export const addUser = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body
  await groupService.groupAddUser(groupId, userId)
  sendSuccess(res, null, 'User added to group successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { description, name } = req.body
  const group = await groupService.groupCreate(name, description)
  sendSuccess(res, { group }, 'Group created successfully', 201)
})

export const deleteGroup = asyncHandler(async (req, res) => {
  await groupService.groupDelete(req.params.id)
  sendSuccess(res, null, 'Group deleted successfully')
})

export const get = asyncHandler(async (req, res) => {
  const group = await groupService.groupGet(req.params.id)
  sendSuccess(res, { group })
})

export const list = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query
  const result = await groupService.groupList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search
  })
  sendSuccess(res, result)
})

export const removeUser = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body
  await groupService.groupRemoveUser(groupId, userId)
  sendSuccess(res, null, 'User removed from group successfully')
})

export const update = asyncHandler(async (req, res) => {
  const group = await groupService.groupUpdate(req.params.id, req.body)
  sendSuccess(res, { group }, 'Group updated successfully')
})
