const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const {
  fnGetFormsList,
  fnGetFormStructure,
  fnGetFormResponses,
  fnGetFormResponsesWithColumns,
} = require("./forms.service");
const { fnGetGoogleFormsCredentials } = require("./forms.credentials");

const formsList = asyncHandler(async (req, res) => {
  const { page_size, page_token } = req.body;
  const google_credentials = fnGetGoogleFormsCredentials();

  const result = await fnGetFormsList({
    credentials: google_credentials,
    page_size: parseInt(page_size) || 10,
    page_token: page_token || null,
  });

  sendSuccess(res, result, "Forms fetched successfully");
});

const formGet = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const google_credentials = fnGetGoogleFormsCredentials();

  const result = await fnGetFormStructure({
    credentials: google_credentials,
    form_id,
  });

  sendSuccess(res, { form: result }, "Form structure fetched successfully");
});

const formResponses = asyncHandler(async (req, res) => {
  const { page_size, page_token, filters } = req.body;
  const { form_id } = req.params;
  const google_credentials = fnGetGoogleFormsCredentials();

  const result = await fnGetFormResponses({
    credentials: google_credentials,
    form_id,
    page_size: parseInt(page_size) || 100,
    page_token: page_token || null,
    filters: filters || {},
  });

  sendSuccess(res, result, "Form responses fetched successfully");
});

const formResponsesWithColumns = asyncHandler(async (req, res) => {
  const { visible_columns, calculate_columns } = req.body;
  const { form_id } = req.params;
  const google_credentials = fnGetGoogleFormsCredentials();

  const result = await fnGetFormResponsesWithColumns({
    credentials: google_credentials,
    form_id,
    visible_columns: visible_columns || [],
    calculate_columns: calculate_columns || [],
  });

  sendSuccess(res, result, "Form responses with columns fetched successfully");
});

const formGetPublic = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const google_credentials = fnGetGoogleFormsCredentials();

  const result = await fnGetFormStructure({
    credentials: google_credentials,
    form_id,
  });

  sendSuccess(res, { form: result }, "Form structure fetched successfully");
});

const formSubmitPublic = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const { answers } = req.body;
  const google_credentials = fnGetGoogleFormsCredentials();

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Answers are required and must be an array" });
  }

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
