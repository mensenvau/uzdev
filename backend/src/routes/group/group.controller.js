import { groupList, groupGet, groupCreate, groupUpdate, groupDelete, groupAddUser, groupRemoveUser } from './group.service.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'

export async function list(req, res) {
  try {
    const groups = await groupList()
    return sendSuccess(res, groups)
  } catch (error) {
    return sendError(res, error.message)
  }
}

export async function get(req, res) {
  try {
    const group = await groupGet(req.params.id)
    return sendSuccess(res, group)
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function create(req, res) {
  try {
    const group = await groupCreate(req.body)
    return sendSuccess(res, group, 'Group created successfully', 201)
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function update(req, res) {
  try {
    const group = await groupUpdate(req.params.id, req.body)
    return sendSuccess(res, group, 'Group updated successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function deleteGroup(req, res) {
  try {
    await groupDelete(req.params.id)
    return sendSuccess(res, null, 'Group deleted successfully')
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function addUser(req, res) {
  try {
    const { groupId, userId } = req.body
    await groupAddUser(groupId, userId)
    return sendSuccess(res, null, 'User added to group successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function removeUser(req, res) {
  try {
    const { groupId, userId } = req.body
    await groupRemoveUser(groupId, userId)
    return sendSuccess(res, null, 'User removed from group successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export default { list, get, create, update, deleteGroup, addUser, removeUser }
