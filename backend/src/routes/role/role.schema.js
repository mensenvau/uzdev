import { z } from "zod";

export const schemaRoleCreate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

export const schemaRoleUpdate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required").optional(),
});

export const schemaRoleAssign = z.object({
  role_id: z.number().int("Role ID must be integer"),
  user_id: z.number().int("User ID must be integer"),
});
