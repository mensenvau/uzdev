import express from 'express'
import { list, get, create, update, deleteUser } from './user.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { POLICIES } from '../../constants/policies.constant.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware(POLICIES.USER_LIST), list)
router.get('/:id', authMiddleware, policyMiddleware(POLICIES.USER_GET), get)
router.post('/', authMiddleware, policyMiddleware(POLICIES.USER_CREATE), create)
router.put('/:id', authMiddleware, policyMiddleware(POLICIES.USER_EDIT), update)
router.delete('/:id', authMiddleware, policyMiddleware(POLICIES.USER_DELETE), deleteUser)

export default router
