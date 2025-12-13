import express from 'express'
import { list, get, create, update, deleteRole, assignToUser, removeFromUser } from './role.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { POLICIES } from '../../constants/policies.constant.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware(POLICIES.ROLE_LIST), list)
router.get('/:id', authMiddleware, policyMiddleware(POLICIES.ROLE_GET), get)
router.post('/', authMiddleware, policyMiddleware(POLICIES.ROLE_CREATE), create)
router.put('/:id', authMiddleware, policyMiddleware(POLICIES.ROLE_EDIT), update)
router.delete('/:id', authMiddleware, policyMiddleware(POLICIES.ROLE_DELETE), deleteRole)
router.post('/assign', authMiddleware, policyMiddleware(POLICIES.ROLE_ASSIGN), assignToUser)
router.post('/remove', authMiddleware, policyMiddleware(POLICIES.ROLE_ASSIGN), removeFromUser)

export default router
