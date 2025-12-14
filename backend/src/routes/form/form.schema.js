import { z } from "zod";

export const schemaFormCreate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

export const schemaFormUpdate = z.object({
  description: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().min(1, "Name is required").optional(),
});

export const schemaFormAccess = z.object({
  access_type: z.enum(["group", "link", "role"], { message: "Invalid access type" }),
  access_value: z.string().min(1, "Access value is required"),
  expires_at: z.string().datetime().optional(),
});

export const schemaFormSubmit = z.object({
  answers: z.array(
    z.object({
      field_id: z.number().int("Field ID must be integer"),
      value: z.string(),
    })
  ),
  token: z.string().optional(),
});
