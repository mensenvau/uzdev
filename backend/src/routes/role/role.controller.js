import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess } from '../../utils/response.util.js'
import * as roleService from './role.service.js'

export const assign = asyncHandler(async (req, res) => {
  const { roleId, userId } = req.body
  await roleService.roleAssignToUser(userId, roleId)
  sendSuccess(res, null, 'Role assigned successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { description, name } = req.body
  const role = await roleService.roleCreate(name, description)
  sendSuccess(res, { role }, 'Role created successfully', 201)
})

export const deleteRole = asyncHandler(async (req, res) => {
  await roleService.roleDelete(req.params.id)
  sendSuccess(res, null, 'Role deleted successfully')
})

export const get = asyncHandler(async (req, res) => {
  const role = await roleService.roleGet(req.params.id)
  sendSuccess(res, { role })
})

export const list = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query
  const result = await roleService.roleList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search
  })
  sendSuccess(res, result)
})

export const remove = asyncHandler(async (req, res) => {
  const { roleId, userId } = req.body
  await roleService.roleRemoveFromUser(userId, roleId)
  sendSuccess(res, null, 'Role removed successfully')
})

export const update = asyncHandler(async (req, res) => {
  const role = await roleService.roleUpdate(req.params.id, req.body)
  sendSuccess(res, { role }, 'Role updated successfully')
})
