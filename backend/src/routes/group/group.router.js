import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { list, get, create, update, remove, addUser, removeUser } from './group.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('group.list'), list)
router.get('/:id', authMiddleware, policyMiddleware('group.get'), get)
router.post('/', authMiddleware, policyMiddleware('group.create'), create)
router.put('/:id', authMiddleware, policyMiddleware('group.update'), update)
router.delete('/:id', authMiddleware, policyMiddleware('group.delete'), remove)
router.post('/:id/users', authMiddleware, policyMiddleware('group.add-user'), addUser)
router.delete('/:id/users/:userId', authMiddleware, policyMiddleware('group.remove-user'), removeUser)

export default router
