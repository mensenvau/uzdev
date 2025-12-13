import { z } from 'zod'

export const groupCreateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required')
})

export const groupUpdateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required').optional()
})

export const groupUserSchema = z.object({
  groupId: z.number().int('Group ID must be integer'),
  userId: z.number().int('User ID must be integer')
})
