import { z } from 'zod'

export const formCreateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required')
})

export const formUpdateSchema = z.object({
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  name: z.string().min(1, 'Name is required').optional()
})

export const formAccessSchema = z.object({
  accessType: z.enum(['group', 'link', 'role'], { message: 'Invalid access type' }),
  accessValue: z.string().min(1, 'Access value is required'),
  expiresAt: z.string().datetime().optional()
})

export const formSubmitSchema = z.object({
  answers: z.array(z.object({
    fieldId: z.number().int('Field ID must be integer'),
    value: z.string()
  })),
  token: z.string().optional()
})
