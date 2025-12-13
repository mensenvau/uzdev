import express from 'express'
import {
  signUp,
  signIn,
  signInWithGoogle,
  verifyEmail,
  refreshToken,
  resendVerification,
  getMe
} from './auth.controller.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { policyMiddleware } from '../../middlewares/policy.middleware.js'
import { POLICIES } from '../../constants/policies.constant.js'

const router = express.Router()

// Public routes
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', signInWithGoogle)
router.post('/verify-email', verifyEmail)
router.post('/refresh-token', refreshToken)

// Protected routes
router.post('/resend-verification', authMiddleware, resendVerification)
router.get('/me', authMiddleware, policyMiddleware(POLICIES.ME_GET), getMe)

export default router
