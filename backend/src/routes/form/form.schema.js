const { z } = require('zod');

const fieldOptionSchema = z.object({
  id: z.number().int().positive().optional(),
  value: z.string().min(1),
  label: z.string().optional(),
  score: z.number().int().optional(),
  option_order: z.number().int().nonnegative().optional(),
});

const fieldTableSourceSchema = z.object({
  source_table: z.string().min(1),
  source_value_column: z.string().min(1),
  source_label_column: z.string().min(1),
});

const fieldSchema = z.object({
  id: z.number().int().positive().optional(),
  field_key: z.string().min(1, "Field key is required"),
  label: z.string().min(1, "Label is required"),
  field_type: z.enum(["text", "textarea", "number", "select", "checkbox", "radio", "table_select", "score"]),
  mode: z.enum(["question", "check"]).optional(),
  is_required: z.boolean().optional(),
  field_order: z.number().int().nonnegative().optional(),
  settings: z.record(z.any()).optional(),
  options: z.array(fieldOptionSchema).optional(),
  table_source: fieldTableSourceSchema.optional(),
});

const schemaFormCreate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  fields: z.array(fieldSchema).optional(),
});

const schemaFormUpdate = z.object({
  description: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().min(1, "Name is required").optional(),
  fields: z.array(fieldSchema).optional(),
});

const schemaFormAccess = z.object({
  access_type: z.enum(["group", "link", "role"], { message: "Invalid access type" }),
  access_value: z.string().min(1, "Access value is required"),
  expires_at: z.string().datetime().optional(),
});

const answerValueSchema = z.union([z.string(), z.number(), z.boolean(), z.array(z.union([z.string(), z.number(), z.boolean()]))]);

const schemaFormSubmit = z.object({
  answers: z.array(
    z.object({
      field_id: z.number().int("Field ID must be integer"),
      value: answerValueSchema,
    })
  ),
  token: z.string().optional(),
});

module.exports = {
  schemaFormCreate,
  schemaFormUpdate,
  schemaFormAccess,
  schemaFormSubmit,
};
