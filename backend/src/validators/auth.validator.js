import { z } from 'zod'

export const authSignUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase')
    .regex(/[a-z]/, 'Password must contain lowercase')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain special character'),
  username: z.string().min(3, 'Username must be at least 3 characters')
})

export const authSignInSchema = z.object({
  login: z.string().min(1, 'Login is required'),
  password: z.string().min(1, 'Password is required')
})

export const authGoogleSchema = z.object({
  email: z.string().email('Invalid email format'),
  googleId: z.string().min(1, 'Google ID is required'),
  username: z.string().optional()
})

export const authRefreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required')
})
