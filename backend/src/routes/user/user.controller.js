import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess, sendError, sendValidationError } from '../../utils/response.util.js'
import * as userService from './user.service.js'

export const list = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query
  const result = await userService.findAllUsers({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    search
  })
  sendSuccess(res, result)
})

export const get = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.params.id)
  if (!user) {
    return sendError(res, 'User not found', 404)
  }
  sendSuccess(res, { user })
})

export const create = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return sendValidationError(res, {
      email: !email ? 'Email is required' : undefined,
      username: !username ? 'Username is required' : undefined,
      password: !password ? 'Password is required' : undefined
    })
  }

  const userId = await userService.createUser(email, username, password)
  const user = await userService.findUserById(userId)
  sendSuccess(res, { user }, 'User created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body)
  if (!user) {
    return sendError(res, 'No fields to update or user not found', 400)
  }
  sendSuccess(res, { user }, 'User updated successfully')
})

export const deleteUser = asyncHandler(async (req, res) => {
  const deleted = await userService.deleteUser(req.params.id)
  if (!deleted) {
    return sendError(res, 'User not found', 404)
  }
  sendSuccess(res, null, 'User deleted successfully')
})

export default { list, get, create, update, deleteUser }
