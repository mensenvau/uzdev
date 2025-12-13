import asyncHandler from '../../utils/async.util.js'
import { sendSuccess, sendError } from '../../utils/response.util.js'
import {
  authSignUp,
  authSignIn,
  authSignInWithGoogle,
  authVerifyEmail,
  authRefreshToken,
  authResendVerification
} from './auth.service.js'

export const signUp = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return sendError(res, 'Email, username, and password are required', 400)
  }

  const result = await authSignUp({ email, username, password })
  return sendSuccess(res, result, 'User created successfully', 201)
})

export const signIn = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  if (!login || !password) {
    return sendError(res, 'Login and password are required', 400)
  }

  const result = await authSignIn({ login, password })
  return sendSuccess(res, result, 'Sign in successful')
})

export const signInWithGoogle = asyncHandler(async (req, res) => {
  const { googleId, email, username } = req.body

  if (!googleId || !email) {
    return sendError(res, 'Google ID and email are required', 400)
  }

  const result = await authSignInWithGoogle({ googleId, email, username })
  return sendSuccess(res, result, 'Google sign in successful')
})

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body

  if (!token) {
    return sendError(res, 'Token is required', 400)
  }

  await authVerifyEmail(token)
  return sendSuccess(res, null, 'Email verified successfully')
})

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return sendError(res, 'Refresh token is required', 400)
  }

  const result = await authRefreshToken(refreshToken)
  return sendSuccess(res, result, 'Token refreshed successfully')
})

export const resendVerification = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const emailVerificationToken = await authResendVerification(userId)
  return sendSuccess(res, { emailVerificationToken }, 'Verification email sent')
})

export const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, req.user, 'User data retrieved')
})

export default {
  signUp,
  signIn,
  signInWithGoogle,
  verifyEmail,
  refreshToken,
  resendVerification,
  getMe
}
