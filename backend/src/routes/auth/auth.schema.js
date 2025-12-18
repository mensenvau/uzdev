const { z } = require('zod');

const schemaAuthSignUp = z.object({
  email: z.string().email("Invalid email format"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().min(3, "Phone is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase")
    .regex(/[a-z]/, "Password must contain lowercase")
    .regex(/[0-9]/, "Password must contain number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),
});

const schemaAuthSignIn = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

const schemaAuthGoogle = z.object({
  id_token: z.string().min(1, "Google ID token is required"),
});

const schemaAuthRefresh = z.object({
  refresh_token: z.string().min(1, "Refresh token is required"),
});

const schemaAuthForgot = z.object({
  email: z.string().email("Invalid email format"),
});

const schemaAuthReset = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase")
    .regex(/[a-z]/, "Password must contain lowercase")
    .regex(/[0-9]/, "Password must contain number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),
});

module.exports = {
  schemaAuthSignUp,
  schemaAuthSignIn,
  schemaAuthGoogle,
  schemaAuthRefresh,
  schemaAuthForgot,
  schemaAuthReset,
};
