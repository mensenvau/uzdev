import express from 'express'
import { authMiddleware, optionalAuthMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import {
  list,
  get,
  create,
  update,
  remove,
  createResponse,
  getResponse,
  listResponses,
  updateResponseStatus
} from './form.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('form.list'), list)
router.get('/:id', authMiddleware, policyMiddleware('form.get'), get)
router.post('/', authMiddleware, policyMiddleware('form.create'), create)
router.put('/:id', authMiddleware, policyMiddleware('form.update'), update)
router.delete('/:id', authMiddleware, policyMiddleware('form.delete'), remove)

router.post('/:id/responses', optionalAuthMiddleware, createResponse)
router.get('/:id/responses', authMiddleware, policyMiddleware('form.list-responses'), listResponses)
router.get('/responses/:responseId', authMiddleware, policyMiddleware('form.get-response'), getResponse)
router.patch('/responses/:responseId/status', authMiddleware, policyMiddleware('form.update-response-status'), updateResponseStatus)

export default router
