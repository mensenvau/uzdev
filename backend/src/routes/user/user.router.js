import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { list, get, create, update, remove, assignRole, removeRole } from './user.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('user.list'), list)
router.get('/:id', authMiddleware, policyMiddleware('user.get'), get)
router.post('/', authMiddleware, policyMiddleware('user.create'), create)
router.put('/:id', authMiddleware, policyMiddleware('user.update'), update)
router.delete('/:id', authMiddleware, policyMiddleware('user.delete'), remove)
router.post('/:id/roles', authMiddleware, policyMiddleware('user.assign-role'), assignRole)
router.delete('/:id/roles/:roleId', authMiddleware, policyMiddleware('user.remove-role'), removeRole)

export default router
