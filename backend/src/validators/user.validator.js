import { z } from 'zod'

export const userCreateSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters')
})

export const userUpdateSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').optional()
})
