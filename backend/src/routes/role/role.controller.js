import { roleList, roleGet, roleCreate, roleUpdate, roleDelete, roleAssignToUser, roleRemoveFromUser } from './role.service.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'

export async function list(req, res) {
  try {
    const roles = await roleList()
    return sendSuccess(res, roles)
  } catch (error) {
    return sendError(res, error.message)
  }
}

export async function get(req, res) {
  try {
    const role = await roleGet(req.params.id)
    return sendSuccess(res, role)
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function create(req, res) {
  try {
    const role = await roleCreate(req.body)
    return sendSuccess(res, role, 'Role created successfully', 201)
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function update(req, res) {
  try {
    const role = await roleUpdate(req.params.id, req.body)
    return sendSuccess(res, role, 'Role updated successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function deleteRole(req, res) {
  try {
    await roleDelete(req.params.id)
    return sendSuccess(res, null, 'Role deleted successfully')
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function assignToUser(req, res) {
  try {
    const { userId, roleId } = req.body
    await roleAssignToUser(userId, roleId)
    return sendSuccess(res, null, 'Role assigned to user successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function removeFromUser(req, res) {
  try {
    const { userId, roleId } = req.body
    await roleRemoveFromUser(userId, roleId)
    return sendSuccess(res, null, 'Role removed from user successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export default { list, get, create, update, deleteRole, assignToUser, removeFromUser }
