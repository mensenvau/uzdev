const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const {
  fnGetFormsList,
  fnGetFormStructure,
  fnGetFormResponses,
  fnGetFormResponsesWithColumns,
} = require("./forms.service");

/**
 * Get list of Google Forms from Drive
 * Expects credentials in request body (service account JSON or OAuth tokens)
 */
const formsList = asyncHandler(async (req, res) => {
  const { credentials, page_size, page_token } = req.body;

  if (!credentials) {
    return res.status(400).json({ error: "Credentials are required" });
  }

  const result = await fnGetFormsList({
    credentials,
    page_size: parseInt(page_size) || 10,
    page_token: page_token || null,
  });

  sendSuccess(res, result, "Forms fetched successfully");
});

/**
 * Get a specific Google Form structure
 */
const formGet = asyncHandler(async (req, res) => {
  const { credentials } = req.body;
  const { form_id } = req.params;

  if (!credentials) {
    return res.status(400).json({ error: "Credentials are required" });
  }

  if (!form_id) {
    return res.status(400).json({ error: "Form ID is required" });
  }

  const result = await fnGetFormStructure({
    credentials,
    form_id,
  });

  sendSuccess(res, { form: result }, "Form structure fetched successfully");
});

/**
 * Get responses from a Google Form
 */
const formResponses = asyncHandler(async (req, res) => {
  const { credentials, page_size, page_token, filters } = req.body;
  const { form_id } = req.params;

  if (!credentials) {
    return res.status(400).json({ error: "Credentials are required" });
  }

  if (!form_id) {
    return res.status(400).json({ error: "Form ID is required" });
  }

  const result = await fnGetFormResponses({
    credentials,
    form_id,
    page_size: parseInt(page_size) || 100,
    page_token: page_token || null,
    filters: filters || {},
  });

  sendSuccess(res, result, "Form responses fetched successfully");
});

/**
 * Get responses with column visibility and calculated columns
 */
const formResponsesWithColumns = asyncHandler(async (req, res) => {
  const { credentials, visible_columns, calculate_columns } = req.body;
  const { form_id } = req.params;

  if (!credentials) {
    return res.status(400).json({ error: "Credentials are required" });
  }

  if (!form_id) {
    return res.status(400).json({ error: "Form ID is required" });
  }

  const result = await fnGetFormResponsesWithColumns({
    credentials,
    form_id,
    visible_columns: visible_columns || [],
    calculate_columns: calculate_columns || [],
  });

  sendSuccess(res, result, "Form responses with columns fetched successfully");
});

module.exports = {
  formsList,
  formGet,
  formResponses,
  formResponsesWithColumns,
};
