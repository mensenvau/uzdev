import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess, sendError, sendValidationError } from '../../utils/response.util.js'
import * as policyService from './policy.service.js'

export const list = asyncHandler(async (req, res) => {
  const policies = await policyService.findAllPolicies()
  sendSuccess(res, { policies })
})

export const get = asyncHandler(async (req, res) => {
  const policy = await policyService.findPolicyById(req.params.id)
  if (!policy) {
    return sendError(res, 'Policy not found', 404)
  }
  sendSuccess(res, { policy })
})

export const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (!name) {
    return sendValidationError(res, { name: 'Name is required' })
  }

  const policyId = await policyService.createPolicy(name, description)
  const policy = await policyService.findPolicyById(policyId)
  sendSuccess(res, { policy }, 'Policy created successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const policy = await policyService.updatePolicy(req.params.id, req.body)
  if (!policy) {
    return sendError(res, 'Policy not found or no fields to update', 400)
  }
  sendSuccess(res, { policy }, 'Policy updated successfully')
})

export const deletePolicy = asyncHandler(async (req, res) => {
  const deleted = await policyService.deletePolicy(req.params.id)
  if (!deleted) {
    return sendError(res, 'Policy not found', 404)
  }
  sendSuccess(res, null, 'Policy deleted successfully')
})

export const assignToRole = asyncHandler(async (req, res) => {
  const { roleId, policyId } = req.body

  if (!roleId || !policyId) {
    return sendValidationError(res, {
      roleId: !roleId ? 'Role ID is required' : undefined,
      policyId: !policyId ? 'Policy ID is required' : undefined
    })
  }

  await policyService.assignPolicyToRole(roleId, policyId)
  sendSuccess(res, null, 'Policy assigned to role successfully')
})

export const removeFromRole = asyncHandler(async (req, res) => {
  const { roleId, policyId } = req.body

  if (!roleId || !policyId) {
    return sendValidationError(res, {
      roleId: !roleId ? 'Role ID is required' : undefined,
      policyId: !policyId ? 'Policy ID is required' : undefined
    })
  }

  await policyService.removePolicyFromRole(roleId, policyId)
  sendSuccess(res, null, 'Policy removed from role successfully')
})

export default { list, get, create, update, deletePolicy, assignToRole, removeFromRole }
