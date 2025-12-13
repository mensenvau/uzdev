import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { authGoogleSchema, authRefreshSchema, authSignInSchema, authSignUpSchema } from '../../validators/auth.validator.js'
import * as authController from './auth.controller.js'

const router = express.Router()

router.post('/signup', validate(authSignUpSchema), authController.signUp)
router.post('/signin', validate(authSignInSchema), authController.signIn)
router.post('/google', validate(authGoogleSchema), authController.signInWithGoogle)
router.post('/refresh-token', validate(authRefreshSchema), authController.refreshToken)
router.get('/me', authMiddleware, policyMiddleware('me.get'), authController.getMe)

export default router
