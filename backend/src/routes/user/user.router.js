import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { userCreateSchema, userUpdateSchema } from '../../validators/user.validator.js'
import * as userController from './user.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('user.list'), userController.list)
router.get('/:id', authMiddleware, policyMiddleware('user.get'), userController.get)
router.post('/', authMiddleware, policyMiddleware('user.create'), validate(userCreateSchema), userController.create)
router.put('/:id', authMiddleware, policyMiddleware('user.edit'), validate(userUpdateSchema), userController.update)
router.delete('/:id', authMiddleware, policyMiddleware('user.delete'), userController.deleteUser)

export default router
