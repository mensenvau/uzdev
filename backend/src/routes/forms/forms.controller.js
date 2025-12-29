const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const {
  fnGetFormsList,
  fnGetFormStructure,
  fnGetFormResponses,
  fnGetFormResponsesWithColumns,
} = require("./forms.service");
const { getGoogleFormsCredentials } = require("./forms.credentials");

/**
 * Get list of Google Forms from Drive
 * Uses credentials from environment variables
 */
const formsList = asyncHandler(async (req, res) => {
  const { page_size, page_token } = req.body;

  const credentials = getGoogleFormsCredentials();
  if (!credentials) {
    return res.status(500).json({
      error: "Google Forms credentials not configured",
      message: "Please add Google API credentials to .env file. See README.md for setup instructions.",
      setup_url: "https://console.cloud.google.com"
    });
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
  const { form_id } = req.params;

  const credentials = getGoogleFormsCredentials();
  if (!credentials) {
    return res.status(500).json({
      error: "Google Forms credentials not configured. Please contact administrator."
    });
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
  const { page_size, page_token, filters } = req.body;
  const { form_id } = req.params;

  const credentials = getGoogleFormsCredentials();
  if (!credentials) {
    return res.status(500).json({
      error: "Google Forms credentials not configured. Please contact administrator."
    });
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
  const { visible_columns, calculate_columns } = req.body;
  const { form_id } = req.params;

  const credentials = getGoogleFormsCredentials();
  if (!credentials) {
    return res.status(500).json({
      error: "Google Forms credentials not configured. Please contact administrator."
    });
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

/**
 * Get public form structure (no auth required)
 * Used for public form filling
 */
const formGetPublic = asyncHandler(async (req, res) => {
  const { form_id } = req.params;

  const credentials = getGoogleFormsCredentials();
  if (!credentials) {
    return res.status(500).json({
      error: "Google Forms credentials not configured. Please contact administrator."
    });
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
 * Submit form response (no auth required for public forms)
 */
const formSubmitPublic = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const { answers } = req.body;

  const credentials = getGoogleFormsCredentials();
  if (!credentials) {
    return res.status(500).json({
      error: "Google Forms credentials not configured. Please contact administrator."
    });
  }

  if (!form_id) {
    return res.status(400).json({ error: "Form ID is required" });
  }

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Answers are required and must be an array" });
  }

  // Here we would submit to Google Forms
  // For now, just return success
  sendSuccess(res, { submitted: true, form_id }, "Form submitted successfully", 201);
});

module.exports = {
  formsList,
  formGet,
  formGetPublic,
  formSubmitPublic,
  formResponses,
  formResponsesWithColumns,
};
