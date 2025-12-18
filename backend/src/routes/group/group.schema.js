const { z } = require('zod');

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

module.exports = {
  schemaGroupCreate,
  schemaGroupUpdate,
  schemaGroupUser,
};
