import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { userCreateSchema, userUpdateSchema } from '../../validators/user.validator.js'
import { create, get, list, remove, update } from './user.controller.js'

const router = express.Router()

router.post('/', authMiddleware, policyMiddleware('user.create'), validate(userCreateSchema), create)
router.get('/', authMiddleware, policyMiddleware('user.list'), list)
router.get('/:id', authMiddleware, policyMiddleware('user.get'), get)
router.put('/:id', authMiddleware, policyMiddleware('user.update'), validate(userUpdateSchema), update)
router.delete('/:id', authMiddleware, policyMiddleware('user.delete'), remove)

export default router
