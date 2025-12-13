import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess } from '../../utils/response.util.js'
import * as formService from './form.service.js'

export const addAccess = asyncHandler(async (req, res) => {
  const { accessType, accessValue, expiresAt } = req.body
  const result = await formService.formAddAccess(req.params.id, accessType, accessValue, expiresAt)
  sendSuccess(res, result, 'Access added successfully', 201)
})

export const create = asyncHandler(async (req, res) => {
  const { description, name } = req.body
  const form = await formService.formCreate(name, description, req.user.id)
  sendSuccess(res, { form }, 'Form created successfully', 201)
})

export const deleteForm = asyncHandler(async (req, res) => {
  await formService.formDelete(req.params.id)
  sendSuccess(res, null, 'Form deleted successfully')
})

export const get = asyncHandler(async (req, res) => {
  const form = await formService.formGet(req.params.id)
  sendSuccess(res, { form })
})

export const list = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query
  const result = await formService.formList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search
  })
  sendSuccess(res, result)
})

export const submit = asyncHandler(async (req, res) => {
  const { answers, token } = req.body
  const result = await formService.formSubmit(req.params.id, req.user?.id || null, answers, token)
  sendSuccess(res, result, 'Form submitted successfully', 201)
})

export const update = asyncHandler(async (req, res) => {
  const form = await formService.formUpdate(req.params.id, req.body)
  sendSuccess(res, { form }, 'Form updated successfully')
})
