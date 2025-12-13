import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess } from '../../utils/response.util.js'
import { userCreate, userDelete, userGet, userList, userUpdate } from './user.service.js'

export const create = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  const result = await userCreate(email, username, password)
  sendSuccess(res, result, 'User created successfully', 201)
})

export const list = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const offset = parseInt(req.query.offset) || 0
  const result = await userList(limit, offset)
  sendSuccess(res, result, 'Users retrieved successfully')
})

export const get = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await userGet(parseInt(id))
  sendSuccess(res, result, 'User retrieved successfully')
})

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { email, username } = req.body
  const result = await userUpdate(parseInt(id), email, username)
  sendSuccess(res, result, 'User updated successfully')
})

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await userDelete(parseInt(id))
  sendSuccess(res, result, 'User deleted successfully')
})
