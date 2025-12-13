import express from 'express'
import * as roleController from './role.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('role.list'), roleController.list)
router.get('/:id', authMiddleware, policyMiddleware('role.get'), roleController.get)
router.post('/', authMiddleware, policyMiddleware('role.create'), roleController.create)
router.put('/:id', authMiddleware, policyMiddleware('role.edit'), roleController.update)
router.delete('/:id', authMiddleware, policyMiddleware('role.delete'), roleController.deleteRole)
router.post('/assign', authMiddleware, policyMiddleware('role.assign'), roleController.assignToUser)
router.post('/remove', authMiddleware, policyMiddleware('role.assign'), roleController.removeFromUser)

export default router
