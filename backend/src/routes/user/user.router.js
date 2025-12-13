import express from 'express'
import * as userController from './user.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('user.list'), userController.list)
router.get('/:id', authMiddleware, policyMiddleware('user.get'), userController.get)
router.post('/', authMiddleware, policyMiddleware('user.create'), userController.create)
router.put('/:id', authMiddleware, policyMiddleware('user.edit'), userController.update)
router.delete('/:id', authMiddleware, policyMiddleware('user.delete'), userController.deleteUser)

export default router
