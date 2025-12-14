import { z } from "zod";

export const schemaDepartmentCreate = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const schemaDepartmentUpdate = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
});

export const schemaDepartmentAssign = z.object({
  user_id: z.number().int("User ID must be integer"),
});
