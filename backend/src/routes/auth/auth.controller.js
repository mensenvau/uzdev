import { asyncHandler } from '../../utils/async.util.js'
import { sendSuccess, sendError, sendValidationError } from '../../utils/response.util.js'
import * as authService from './auth.service.js'

export const signUp = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return sendValidationError(res, {
      email: !email ? 'Email is required' : undefined,
      username: !username ? 'Username is required' : undefined,
      password: !password ? 'Password is required' : undefined
    })
  }

  const existingUser = await authService.findUserByEmail(email)
  if (existingUser) {
    return sendError(res, 'Email already registered', 400)
  }

  const userId = await authService.createUser(email, username, password)
  const tokens = await authService.generateTokens(userId)
  const user = await authService.findUserById(userId)

  sendSuccess(res, { user, ...tokens }, 'User registered successfully', 201)
})

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return sendValidationError(res, {
      email: !email ? 'Email is required' : undefined,
      password: !password ? 'Password is required' : undefined
    })
  }

  const user = await authService.findUserByEmail(email)
  if (!user) {
    return sendError(res, 'Invalid credentials', 401)
  }

  const isValidPassword = await authService.verifyPassword(password, user.password)
  if (!isValidPassword) {
    return sendError(res, 'Invalid credentials', 401)
  }

  const tokens = await authService.generateTokens(user.id)
  const userData = await authService.findUserById(user.id)

  sendSuccess(res, { user: userData, ...tokens }, 'Signed in successfully')
})

export const signInWithGoogle = asyncHandler(async (req, res) => {
  const { googleId, email, name } = req.body

  if (!googleId || !email) {
    return sendValidationError(res, {
      googleId: !googleId ? 'Google ID is required' : undefined,
      email: !email ? 'Email is required' : undefined
    })
  }

  const user = await authService.findOrCreateGoogleUser(googleId, email, name)
  const tokens = await authService.generateTokens(user.id)
  const userData = await authService.findUserById(user.id)

  sendSuccess(res, { user: userData, ...tokens }, 'Signed in with Google successfully')
})

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return sendValidationError(res, { refreshToken: 'Refresh token is required' })
  }

  const userId = await authService.verifyRefreshToken(refreshToken)
  if (!userId) {
    return sendError(res, 'Invalid or expired refresh token', 401)
  }

  await authService.revokeRefreshToken(refreshToken)
  const tokens = await authService.generateTokens(userId)

  sendSuccess(res, tokens, 'Token refreshed successfully')
})

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.findUserById(req.user.id)
  sendSuccess(res, { user }, 'User retrieved successfully')
})

export default {
  signUp,
  signIn,
  signInWithGoogle,
  refreshToken,
  getMe
}
