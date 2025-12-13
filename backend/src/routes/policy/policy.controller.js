import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess } from '../../utils/response.util.js'
import * as policyService from './policy.service.js'

export const assign = asyncHandler(async (req, res) => {
  const { policyId, roleId } = req.body
  await policyService.policyAssignToRole(roleId, policyId)
  sendSuccess(res, null, 'Policy assigned successfully')
})

export const create = asyncHandler(async (req, res) => {
  const { description, name } = req.body
  const policy = await policyService.policyCreate(name, description)
  sendSuccess(res, { policy }, 'Policy created successfully', 201)
})

export const deletePolicy = asyncHandler(async (req, res) => {
  await policyService.policyDelete(req.params.id)
  sendSuccess(res, null, 'Policy deleted successfully')
})

export const get = asyncHandler(async (req, res) => {
  const policy = await policyService.policyGet(req.params.id)
  sendSuccess(res, { policy })
})

export const list = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query
  const result = await policyService.policyList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search
  })
  sendSuccess(res, result)
})

export const remove = asyncHandler(async (req, res) => {
  const { policyId, roleId } = req.body
  await policyService.policyRemoveFromRole(roleId, policyId)
  sendSuccess(res, null, 'Policy removed successfully')
})

export const update = asyncHandler(async (req, res) => {
  const policy = await policyService.policyUpdate(req.params.id, req.body)
  sendSuccess(res, { policy }, 'Policy updated successfully')
})
