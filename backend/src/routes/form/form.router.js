import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { formAccessSchema, formCreateSchema, formSubmitSchema, formUpdateSchema } from '../../validators/form.validator.js'
import * as formController from './form.controller.js'

const router = express.Router()

router.get('/', authMiddleware, policyMiddleware('form.list'), formController.list)
router.get('/:id', authMiddleware, policyMiddleware('form.get'), formController.get)
router.post('/', authMiddleware, policyMiddleware('form.create'), validate(formCreateSchema), formController.create)
router.put('/:id', authMiddleware, policyMiddleware('form.edit'), validate(formUpdateSchema), formController.update)
router.delete('/:id', authMiddleware, policyMiddleware('form.delete'), formController.deleteForm)
router.post('/:id/access', authMiddleware, policyMiddleware('form.add_access'), validate(formAccessSchema), formController.addAccess)
router.post('/:id/submit', validate(formSubmitSchema), formController.submit)

export default router
