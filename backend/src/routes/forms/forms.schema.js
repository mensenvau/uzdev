const { z } = require("zod");

const credentialsSchema = z.union([
  // Service Account
  z.object({
    type: z.literal("service_account"),
    project_id: z.string(),
    private_key_id: z.string(),
    private_key: z.string(),
    client_email: z.string().email(),
    client_id: z.string(),
    auth_uri: z.string().url(),
    token_uri: z.string().url(),
    auth_provider_x509_cert_url: z.string().url(),
    client_x509_cert_url: z.string().url(),
  }),
  // OAuth2 Token
  z.object({
    access_token: z.string(),
    refresh_token: z.string().optional(),
    token_type: z.string().optional(),
    expiry_date: z.number().optional(),
  }),
]);

const formsListSchema = z.object({
  credentials: credentialsSchema,
  page_size: z.number().int().positive().max(100).optional(),
  page_token: z.string().optional().nullable(),
});

const formGetSchema = z.object({
  credentials: credentialsSchema,
});

const formResponsesSchema = z.object({
  credentials: credentialsSchema,
  page_size: z.number().int().positive().max(1000).optional(),
  page_token: z.string().optional().nullable(),
  filters: z
    .object({
      filter: z.string().optional(),
    })
    .optional(),
});

const calculatedColumnSchema = z.object({
  name: z.string(),
  type: z.enum(["sum", "concat", "count", "average"]),
  fields: z.array(z.string()),
  separator: z.string().optional(), // For concat type
});

const formResponsesWithColumnsSchema = z.object({
  credentials: credentialsSchema,
  visible_columns: z.array(z.string()).optional(),
  calculate_columns: z.array(calculatedColumnSchema).optional(),
});

module.exports = {
  formsListSchema,
  formGetSchema,
  formResponsesSchema,
  formResponsesWithColumnsSchema,
};
