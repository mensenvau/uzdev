import express from 'express'
import { list, get, create, update, deleteGroup, addUser, removeUser } from './group.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { POLICIES } from '../../constants/policies.constant.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware(POLICIES.GROUP_LIST), list)
router.get('/:id', authMiddleware, policyMiddleware(POLICIES.GROUP_GET), get)
router.post('/', authMiddleware, policyMiddleware(POLICIES.GROUP_CREATE), create)
router.put('/:id', authMiddleware, policyMiddleware(POLICIES.GROUP_EDIT), update)
router.delete('/:id', authMiddleware, policyMiddleware(POLICIES.GROUP_DELETE), deleteGroup)
router.post('/add-user', authMiddleware, policyMiddleware(POLICIES.GROUP_ASSIGN), addUser)
router.post('/remove-user', authMiddleware, policyMiddleware(POLICIES.GROUP_ASSIGN), removeUser)

export default router
