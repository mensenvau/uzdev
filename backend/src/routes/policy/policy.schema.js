const { z } = require("zod");

const schemaPolicyCreate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

const schemaPolicyUpdate = z.object({
  description: z.string().optional(),
  name: z.string().min(1, "Name is required").optional(),
});

const schemaPolicyAssign = z.object({
  policy_id: z.number().int("Policy ID must be integer"),
  role_id: z.number().int("Role ID must be integer"),
});

module.exports = {
  schemaPolicyCreate,
  schemaPolicyUpdate,
  schemaPolicyAssign,
};
