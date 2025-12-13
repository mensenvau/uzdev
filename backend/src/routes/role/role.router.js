import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { list, get, create, update, remove, assignPolicy, removePolicy } from './role.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('role.list'), list)
router.get('/:id', authMiddleware, policyMiddleware('role.get'), get)
router.post('/', authMiddleware, policyMiddleware('role.create'), create)
router.put('/:id', authMiddleware, policyMiddleware('role.update'), update)
router.delete('/:id', authMiddleware, policyMiddleware('role.delete'), remove)
router.post('/:id/policies', authMiddleware, policyMiddleware('role.assign-policy'), assignPolicy)
router.delete('/:id/policies/:policyId', authMiddleware, policyMiddleware('role.remove-policy'), removePolicy)

export default router
