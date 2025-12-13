import { policyList, policyGet, policyCreate, policyUpdate, policyDelete, policyAssignToRole, policyRemoveFromRole } from './policy.service.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'

export async function list(req, res) {
  try {
    const policies = await policyList()
    return sendSuccess(res, policies)
  } catch (error) {
    return sendError(res, error.message)
  }
}

export async function get(req, res) {
  try {
    const policy = await policyGet(req.params.id)
    return sendSuccess(res, policy)
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function create(req, res) {
  try {
    const policy = await policyCreate(req.body)
    return sendSuccess(res, policy, 'Policy created successfully', 201)
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function update(req, res) {
  try {
    const policy = await policyUpdate(req.params.id, req.body)
    return sendSuccess(res, policy, 'Policy updated successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function deletePolicy(req, res) {
  try {
    await policyDelete(req.params.id)
    return sendSuccess(res, null, 'Policy deleted successfully')
  } catch (error) {
    return sendError(res, error.message, 404)
  }
}

export async function assignToRole(req, res) {
  try {
    const { roleId, policyId } = req.body
    await policyAssignToRole(roleId, policyId)
    return sendSuccess(res, null, 'Policy assigned to role successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export async function removeFromRole(req, res) {
  try {
    const { roleId, policyId } = req.body
    await policyRemoveFromRole(roleId, policyId)
    return sendSuccess(res, null, 'Policy removed from role successfully')
  } catch (error) {
    return sendError(res, error.message, 400)
  }
}

export default { list, get, create, update, deletePolicy, assignToRole, removeFromRole }
