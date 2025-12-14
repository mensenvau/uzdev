import { z } from "zod";

export const schemaGroupCreate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

export const schemaGroupUpdate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required").optional(),
});

export const schemaGroupUser = z.object({
  group_id: z.number().int("Group ID must be integer"),
  user_id: z.number().int("User ID must be integer"),
});
