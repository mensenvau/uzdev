import { userList, userGet, userCreate, userUpdate, userDelete } from './user.service.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'

export async function list(req, res) {
  try {
    const { page, limit, search } = req.query
    const result = await userList({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search
    })
    return sendSuccess(res, result)
  } catch (error) {
    return sendError(res, error.message)
  }
}

export async function get(req, res) {
  try {
    const user = await userGet(req.params.id)
    return sendSuccess(res, user)
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function create(req, res) {
  try {
    const user = await userCreate(req.body)
    return sendSuccess(res, user, 'User created successfully', 201)
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function update(req, res) {
  try {
    const user = await userUpdate(req.params.id, req.body)
    return sendSuccess(res, user, 'User updated successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function deleteUser(req, res) {
  try {
    await userDelete(req.params.id)
    return sendSuccess(res, null, 'User deleted successfully')
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export default { list, get, create, update, deleteUser }
