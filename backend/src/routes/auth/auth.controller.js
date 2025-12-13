import { asyncHandler } from '../../utils/async.util.js'
import { sendError, sendSuccess } from '../../utils/response.util.js'
import { authRefreshToken, authSignIn, authSignInWithGoogle, authSignUp } from './auth.service.js'

export const signUp = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  const result = await authSignUp(email, username, password)
  sendSuccess(res, result, 'User registered successfully', 201)
})

export const signIn = asyncHandler(async (req, res) => {
  const { login, password } = req.body
  const result = await authSignIn(login, password)
  sendSuccess(res, result, 'Signed in successfully')
})

export const googleAuth = asyncHandler(async (req, res) => {
  const { googleId, email, username } = req.body
  const result = await authSignInWithGoogle(googleId, email, username)
  sendSuccess(res, result, 'Signed in with Google successfully')
})

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  const result = await authRefreshToken(refreshToken)
  sendSuccess(res, result, 'Token refreshed successfully')
})
