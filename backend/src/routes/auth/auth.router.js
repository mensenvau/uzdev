import express from 'express'
import { validate } from '../../middlewares/validate.middleware.js'
import { authGoogleSchema, authRefreshSchema, authSignInSchema, authSignUpSchema } from '../../validators/auth.validator.js'
import { googleAuth, refreshToken, signIn, signUp } from './auth.controller.js'

const router = express.Router()

router.post('/signup', validate(authSignUpSchema), signUp)
router.post('/signin', validate(authSignInSchema), signIn)
router.post('/google', validate(authGoogleSchema), googleAuth)
router.post('/refresh', validate(authRefreshSchema), refreshToken)

export default router
