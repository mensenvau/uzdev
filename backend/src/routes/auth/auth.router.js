import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import {
  signUp,
  signIn,
  signInWithGoogle,
  verifyEmail,
  refreshToken,
  resendVerification,
  getMe
} from './auth.controller.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', signInWithGoogle)
router.post('/verify-email', verifyEmail)
router.post('/refresh', refreshToken)
router.post('/resend-verification', authMiddleware, resendVerification)
router.get('/me', authMiddleware, getMe)

export default router
