import { asyncHandler } from '../../utils/async.util.js'
import { sendError, sendSuccess } from '../../utils/response.util.js'
import * as userService from './user.service.js'

export const create = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body
  const user = await userService.userCreate(email, password, username)
  sendSuccess(res, { user }, 'User created successfully', 201)
})

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.userDelete(req.params.id)
  sendSuccess(res, null, 'User deleted successfully')
})

export const get = asyncHandler(async (req, res) => {
  const user = await userService.userGet(req.params.id)
  sendSuccess(res, { user })
})

export const list = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query
  const result = await userService.userList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search
  })
  sendSuccess(res, result)
})

export const update = asyncHandler(async (req, res) => {
  const user = await userService.userUpdate(req.params.id, req.body)
  sendSuccess(res, { user }, 'User updated successfully')
})
