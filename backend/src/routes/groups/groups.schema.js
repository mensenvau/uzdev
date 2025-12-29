const { z } = require("zod");

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
  schemaAssignFormToGroup,
  schemaFormId,
  schemaRemoveFormFromGroup,
};
