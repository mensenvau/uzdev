import express from 'express'
import {
  create,
  get,
  list,
  update,
  deleteForm,
  addField,
  assignAccess,
  generateLink,
  submitResponse,
  getResponses
} from './form.controller.js'
import { authMiddleware, optionalAuthMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { POLICIES } from '../../constants/policies.constant.js'

const router = express.Router()

// Form CRUD
router.get('/', authMiddleware, policyMiddleware(POLICIES.FORM_LIST), list)
router.get('/:id', optionalAuthMiddleware, get) // Optional auth for public links
router.post('/', authMiddleware, policyMiddleware(POLICIES.FORM_CREATE), create)
router.put('/:id', authMiddleware, policyMiddleware(POLICIES.FORM_EDIT), update)
router.delete('/:id', authMiddleware, policyMiddleware(POLICIES.FORM_DELETE), deleteForm)

// Form fields
router.post('/:id/fields', authMiddleware, policyMiddleware(POLICIES.FORM_EDIT), addField)

// Access control
router.post('/:id/access', authMiddleware, policyMiddleware(POLICIES.FORM_ACCESS_MANAGE), assignAccess)
router.post('/:id/generate-link', authMiddleware, policyMiddleware(POLICIES.FORM_ACCESS_MANAGE), generateLink)

// Responses
router.post('/:id/submit', optionalAuthMiddleware, submitResponse) // Optional auth for public forms
router.get('/:id/responses', authMiddleware, policyMiddleware(POLICIES.FORM_VIEW_RESPONSES), getResponses)

export default router
