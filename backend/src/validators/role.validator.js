import { z } from 'zod'

export const roleCreateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required')
})

export const roleUpdateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required').optional()
})

export const roleAssignSchema = z.object({
  roleId: z.number().int('Role ID must be integer'),
  userId: z.number().int('User ID must be integer')
})
