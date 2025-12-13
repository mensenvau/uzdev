import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess, sendError, sendValidationError } from '../../utils/response.util.js'
import * as roleService from './role.service.js'

export const list = asyncHandler(async (req, res) => {
  const roles = await roleService.findAllRoles()
  sendSuccess(res, { roles })
})

export const get = asyncHandler(async (req, res) => {
  const role = await roleService.findRoleById(req.params.id)
  if (!role) {
    return sendError(res, 'Role not found', 404)
  }
  sendSuccess(res, { role })
})

export const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (!name) {
    return sendValidationError(res, { name: 'Name is required' })
  }

  const roleId = await roleService.createRole(name, description)
  const role = await roleService.findRoleById(roleId)
  sendSuccess(res, { role }, 'Role created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const role = await roleService.updateRole(req.params.id, req.body)
  if (!role) {
    return sendError(res, 'Role not found or no fields to update', 400)
  }
  sendSuccess(res, { role }, 'Role updated successfully')
})

export const deleteRole = asyncHandler(async (req, res) => {
  const deleted = await roleService.deleteRole(req.params.id)
  if (!deleted) {
    return sendError(res, 'Role not found', 404)
  }
  sendSuccess(res, null, 'Role deleted successfully')
})

export const assignToUser = asyncHandler(async (req, res) => {
  const { userId, roleId } = req.body

  if (!userId || !roleId) {
    return sendValidationError(res, {
      userId: !userId ? 'User ID is required' : undefined,
      roleId: !roleId ? 'Role ID is required' : undefined
    })
  }

  await roleService.assignRoleToUser(userId, roleId)
  sendSuccess(res, null, 'Role assigned to user successfully')
})

export const removeFromUser = asyncHandler(async (req, res) => {
  const { userId, roleId } = req.body

  if (!userId || !roleId) {
    return sendValidationError(res, {
      userId: !userId ? 'User ID is required' : undefined,
      roleId: !roleId ? 'Role ID is required' : undefined
    })
  }

  await roleService.removeRoleFromUser(userId, roleId)
  sendSuccess(res, null, 'Role removed from user successfully')
})

export default { list, get, create, update, deleteRole, assignToUser, removeFromUser }
