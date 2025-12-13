import {
  authSignUp,
  authSignIn,
  authSignInWithGoogle,
  authVerifyEmail,
  authRefreshToken,
  authResendVerification
} from './auth.service.js'
import { sendSuccess, sendError, sendValidationError } from '../../utils/response.util.js'
import { validatePassword } from '../../utils/password.util.js'

/**
 * Sign up controller
 */
export async function signUp(req, res) {
  try {
    const { email, username, password } = req.body

    // Validation
    const errors = []

    if (!email) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Invalid email format')
    }

    if (!username) {
      errors.push('Username is required')
    } else if (username.length < 3) {
      errors.push('Username must be at least 3 characters long')
    }

    if (!password) {
      errors.push('Password is required')
    } else {
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.valid) {
        errors.push(...passwordValidation.errors)
      }
    }

    if (errors.length > 0) {
      return sendValidationError(res, errors)
    }

    // Create user
    const result = await authSignUp({ email, username, password })

    return sendSuccess(res, result, 'User registered successfully', 201)
  } catch (error) {
    console.error('Sign up error:', error)
    return sendError(res, error.message, 400)
  }
}

/**
 * Sign in controller
 */
export async function signIn(req, res) {
  try {
    const { login, password } = req.body

    // Validation
    if (!login || !password) {
      return sendValidationError(res, ['Login and password are required'])
    }

    // Sign in
    const result = await authSignIn({ login, password })

    return sendSuccess(res, result, 'Login successful')
  } catch (error) {
    console.error('Sign in error:', error)
    return sendError(res, error.message, 401)
  }
}

/**
 * Sign in with Google controller
 */
export async function signInWithGoogle(req, res) {
  try {
    const { googleId, email, username } = req.body

    // Validation
    if (!googleId || !email) {
      return sendValidationError(res, ['Google ID and email are required'])
    }

    // Sign in with Google
    const result = await authSignInWithGoogle({ googleId, email, username })

    return sendSuccess(res, result, 'Google login successful')
  } catch (error) {
    console.error('Google sign in error:', error)
    return sendError(res, error.message, 400)
  }
}

/**
 * Verify email controller
 */
export async function verifyEmail(req, res) {
  try {
    const { token } = req.body

    if (!token) {
      return sendValidationError(res, ['Token is required'])
    }

    await authVerifyEmail(token)

    return sendSuccess(res, null, 'Email verified successfully')
  } catch (error) {
    console.error('Email verification error:', error)
    return sendError(res, error.message, 400)
  }
}

/**
 * Refresh token controller
 */
export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return sendValidationError(res, ['Refresh token is required'])
    }

    const result = await authRefreshToken(refreshToken)

    return sendSuccess(res, result, 'Token refreshed successfully')
  } catch (error) {
    console.error('Refresh token error:', error)
    return sendError(res, error.message, 401)
  }
}

/**
 * Resend verification email controller
 */
export async function resendVerification(req, res) {
  try {
    // User must be authenticated
    if (!req.user) {
      return sendError(res, 'Authentication required', 401)
    }

    const token = await authResendVerification(req.user.id)

    return sendSuccess(res, { emailVerificationToken: token }, 'Verification email resent')
  } catch (error) {
    console.error('Resend verification error:', error)
    return sendError(res, error.message, 400)
  }
}

/**
 * Get current user controller
 */
export async function getMe(req, res) {
  try {
    // User is set by authMiddleware
    return sendSuccess(res, req.user, 'User retrieved successfully')
  } catch (error) {
    console.error('Get me error:', error)
    return sendError(res, error.message, 400)
  }
}

export default {
  signUp,
  signIn,
  signInWithGoogle,
  verifyEmail,
  refreshToken,
  resendVerification,
  getMe
}
