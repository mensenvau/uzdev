import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess } from '../../utils/response.util.js'
import * as authService from './auth.service.js'

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, { user: req.user })
})

export const refreshToken = asyncHandler(async (req, res) => {
  const result = await authService.authRefreshToken(req.body.refreshToken)
  sendSuccess(res, result)
})

export const signIn = asyncHandler(async (req, res) => {
  const result = await authService.authSignIn(req.body.login, req.body.password)
  sendSuccess(res, result)
})

export const signInWithGoogle = asyncHandler(async (req, res) => {
  const { email, googleId, username } = req.body
  const result = await authService.authSignInWithGoogle(googleId, email, username)
  sendSuccess(res, result)
})

export const signUp = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body
  const result = await authService.authSignUp(email, username, password)
  sendSuccess(res, result, 'User registered successfully', 201)
})
