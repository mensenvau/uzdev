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

const schemaFormsList = z.object({
  page_size: z.number().int().positive().max(100).optional(),
  page_token: z.string().optional().nullable(),
});

const schemaFormGet = z.object({
  form_id: z.string().min(1, "Form ID is required"),
});

const schemaFormResponses = z.object({
  form_id: z.string().min(1, "Form ID is required"),
  page_size: z.number().int().positive().max(1000).optional(),
  page_token: z.string().optional().nullable(),
  filters: z
    .object({
      filter: z.string().optional(),
    })
    .optional(),
});

const schemaCalculatedColumn = z.object({
  name: z.string(),
  type: z.enum(["sum", "concat", "count", "average"]),
  fields: z.array(z.string()),
  separator: z.string().optional(),
});

const schemaFormResponsesWithColumns = z.object({
  form_id: z.string().min(1, "Form ID is required"),
  visible_columns: z.array(z.string()).optional(),
  calculate_columns: z.array(schemaCalculatedColumn).optional(),
});

module.exports = {
  schemaFormsList,
  schemaFormGet,
  schemaFormResponses,
  schemaFormResponsesWithColumns,
};
