import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { groupCreateSchema, groupUpdateSchema, groupUserSchema } from '../../validators/group.validator.js'
import * as groupController from './group.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('group.list'), groupController.list)
router.get('/:id', authMiddleware, policyMiddleware('group.get'), groupController.get)
router.post('/', authMiddleware, policyMiddleware('group.create'), validate(groupCreateSchema), groupController.create)
router.put('/:id', authMiddleware, policyMiddleware('group.edit'), validate(groupUpdateSchema), groupController.update)
router.delete('/:id', authMiddleware, policyMiddleware('group.delete'), groupController.deleteGroup)
router.post('/add-user', authMiddleware, policyMiddleware('group.add_user'), validate(groupUserSchema), groupController.addUser)
router.post('/remove-user', authMiddleware, policyMiddleware('group.remove_user'), validate(groupUserSchema), groupController.removeUser)

export default router
