const { z } = require("zod");

const schemaGroupCreate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

const schemaGroupUpdate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required").optional(),
});

const schemaGroupUser = z.object({
  group_id: z.number().int("Group ID must be integer"),
  user_id: z.number().int("User ID must be integer"),
});

// Form-group mappings
const schemaAssignFormToGroup = z.object({
  group_id: z.number().int().positive("Group ID is required"),
});

const schemaFormId = z.object({
  form_id: z.string().min(1, "Form ID is required"),
});

const schemaRemoveFormFromGroup = z.object({
  form_id: z.string().min(1, "Form ID is required"),
  group_id: z.string().min(1, "Group ID is required"),
});

module.exports = {
  schemaGroupCreate,
  schemaGroupUpdate,
  schemaGroupUser,
  schemaAssignFormToGroup,
  schemaFormId,
  schemaRemoveFormFromGroup,
};
