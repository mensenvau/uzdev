import express from 'express'
import * as authController from './auth.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/google', authController.signInWithGoogle)
router.post('/refresh-token', authController.refreshToken)
router.get('/me', authMiddleware, authController.getMe)

export default router
