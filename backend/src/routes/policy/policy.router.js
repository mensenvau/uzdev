import express from 'express'
import { list, get, create, update, deletePolicy, assignToRole, removeFromRole } from './policy.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { POLICIES } from '../../constants/policies.constant.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware(POLICIES.POLICY_LIST), list)
router.get('/:id', authMiddleware, policyMiddleware(POLICIES.POLICY_GET), get)
router.post('/', authMiddleware, policyMiddleware(POLICIES.POLICY_CREATE), create)
router.put('/:id', authMiddleware, policyMiddleware(POLICIES.POLICY_EDIT), update)
router.delete('/:id', authMiddleware, policyMiddleware(POLICIES.POLICY_DELETE), deletePolicy)
router.post('/assign', authMiddleware, policyMiddleware(POLICIES.POLICY_ASSIGN), assignToRole)
router.post('/remove', authMiddleware, policyMiddleware(POLICIES.POLICY_ASSIGN), removeFromRole)

export default router
