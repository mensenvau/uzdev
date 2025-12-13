import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { policyAssignSchema, policyCreateSchema, policyUpdateSchema } from '../../validators/policy.validator.js'
import * as policyController from './policy.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('policy.list'), policyController.list)
router.get('/:id', authMiddleware, policyMiddleware('policy.get'), policyController.get)
router.post('/', authMiddleware, policyMiddleware('policy.create'), validate(policyCreateSchema), policyController.create)
router.put('/:id', authMiddleware, policyMiddleware('policy.edit'), validate(policyUpdateSchema), policyController.update)
router.delete('/:id', authMiddleware, policyMiddleware('policy.delete'), policyController.deletePolicy)
router.post('/assign', authMiddleware, policyMiddleware('policy.assign'), validate(policyAssignSchema), policyController.assign)
router.post('/remove', authMiddleware, policyMiddleware('policy.remove'), validate(policyAssignSchema), policyController.remove)

export default router
