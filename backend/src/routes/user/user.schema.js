const { z } = require('zod');

const schemaUserCreate = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().min(3, "Phone is required"),
});

const schemaUserUpdate = z.object({
  email: z.string().email("Invalid email format").optional(),
  first_name: z.string().min(1, "First name is required").optional(),
  last_name: z.string().min(1, "Last name is required").optional(),
  phone: z.string().min(3, "Phone is required").optional(),
});

module.exports = {
  schemaUserCreate,
  schemaUserUpdate,
};
