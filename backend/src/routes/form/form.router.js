import express from 'express'
import * as formController from './form.controller.js'
import { authMiddleware, optionalAuthMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('form.list'), formController.list)
router.get('/:id', optionalAuthMiddleware, formController.get)
router.post('/', authMiddleware, policyMiddleware('form.create'), formController.create)
router.put('/:id', authMiddleware, policyMiddleware('form.edit'), formController.update)
router.delete('/:id', authMiddleware, policyMiddleware('form.delete'), formController.deleteForm)

router.post('/:id/fields', authMiddleware, policyMiddleware('form.edit'), formController.addField)
router.post('/:id/access', authMiddleware, policyMiddleware('form.access_manage'), formController.assignAccess)
router.post('/:id/generate-link', authMiddleware, policyMiddleware('form.access_manage'), formController.generateLink)

router.post('/:id/submit', optionalAuthMiddleware, formController.submitResponse)
router.get('/:id/responses', authMiddleware, policyMiddleware('form.view_responses'), formController.getResponses)

export default router
