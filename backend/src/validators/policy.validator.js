import { z } from 'zod'

export const policyCreateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required')
})

export const policyUpdateSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required').optional()
})

export const policyAssignSchema = z.object({
  policyId: z.number().int('Policy ID must be integer'),
  roleId: z.number().int('Role ID must be integer')
})
