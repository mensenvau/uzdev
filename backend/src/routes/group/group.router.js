import express from 'express'
import * as groupController from './group.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('group.list'), groupController.list)
router.get('/:id', authMiddleware, policyMiddleware('group.get'), groupController.get)
router.post('/', authMiddleware, policyMiddleware('group.create'), groupController.create)
router.put('/:id', authMiddleware, policyMiddleware('group.edit'), groupController.update)
router.delete('/:id', authMiddleware, policyMiddleware('group.delete'), groupController.deleteGroup)
router.post('/add-user', authMiddleware, policyMiddleware('group.assign'), groupController.addUser)
router.post('/remove-user', authMiddleware, policyMiddleware('group.assign'), groupController.removeUser)

export default router
