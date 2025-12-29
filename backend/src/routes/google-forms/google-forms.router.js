const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody } = require("../../middlewares/validate.middleware");
const {
  googleFormsListSchema,
  googleFormGetSchema,
  googleFormResponsesSchema,
  googleFormResponsesWithColumnsSchema,
} = require("./google-forms.schema");
const {
  googleFormsList,
  googleFormGet,
  googleFormResponses,
  googleFormResponsesWithColumns,
} = require("./google-forms.controller");

const router = express.Router();

// List all Google Forms from Drive
router.post("/list", authMiddleware, policyMiddleware("google_forms.list"), validateBody(googleFormsListSchema), googleFormsList);

// Get specific Google Form structure
router.post("/:form_id", authMiddleware, policyMiddleware("google_forms.get"), validateBody(googleFormGetSchema), googleFormGet);

// Get form responses (basic)
router.post("/:form_id/responses", authMiddleware, policyMiddleware("google_forms.view_responses"), validateBody(googleFormResponsesSchema), googleFormResponses);

// Get form responses with column visibility and calculated columns
router.post("/:form_id/responses/columns", authMiddleware, policyMiddleware("google_forms.view_responses"), validateBody(googleFormResponsesWithColumnsSchema), googleFormResponsesWithColumns);

module.exports = router;
