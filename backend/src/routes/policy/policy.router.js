import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { list, get, create, update, remove } from './policy.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('policy.list'), list)
router.get('/:id', authMiddleware, policyMiddleware('policy.get'), get)
router.post('/', authMiddleware, policyMiddleware('policy.create'), create)
router.put('/:id', authMiddleware, policyMiddleware('policy.update'), update)
router.delete('/:id', authMiddleware, policyMiddleware('policy.delete'), remove)

export default router
