import express from 'express'
import * as policyController from './policy.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('policy.list'), policyController.list)
router.get('/:id', authMiddleware, policyMiddleware('policy.get'), policyController.get)
router.post('/', authMiddleware, policyMiddleware('policy.create'), policyController.create)
router.put('/:id', authMiddleware, policyMiddleware('policy.edit'), policyController.update)
router.delete('/:id', authMiddleware, policyMiddleware('policy.delete'), policyController.deletePolicy)
router.post('/assign', authMiddleware, policyMiddleware('policy.assign'), policyController.assignToRole)
router.post('/remove', authMiddleware, policyMiddleware('policy.assign'), policyController.removeFromRole)

export default router
