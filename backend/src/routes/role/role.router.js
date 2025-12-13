import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { roleAssignSchema, roleCreateSchema, roleUpdateSchema } from '../../validators/role.validator.js'
import * as roleController from './role.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('role.list'), roleController.list)
router.get('/:id', authMiddleware, policyMiddleware('role.get'), roleController.get)
router.post('/', authMiddleware, policyMiddleware('role.create'), validate(roleCreateSchema), roleController.create)
router.put('/:id', authMiddleware, policyMiddleware('role.edit'), validate(roleUpdateSchema), roleController.update)
router.delete('/:id', authMiddleware, policyMiddleware('role.delete'), roleController.deleteRole)
router.post('/assign', authMiddleware, policyMiddleware('role.assign'), validate(roleAssignSchema), roleController.assign)
router.post('/remove', authMiddleware, policyMiddleware('role.remove'), validate(roleAssignSchema), roleController.remove)

export default router
