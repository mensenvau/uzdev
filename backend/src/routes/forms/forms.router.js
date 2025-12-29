const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody } = require("../../middlewares/validate.middleware");
const {
  formsListSchema,
  formGetSchema,
  formResponsesSchema,
  formResponsesWithColumnsSchema,
} = require("./forms.schema");
const {
  formsList,
  formGet,
  formResponses,
  formResponsesWithColumns,
} = require("./forms.controller");

const router = express.Router();

// List all Google Forms from Drive
router.post("/list", authMiddleware, policyMiddleware("forms.list"), validateBody(formsListSchema), formsList);

// Get specific Google Form structure
router.post("/:form_id", authMiddleware, policyMiddleware("forms.get"), validateBody(formGetSchema), formGet);

// Get form responses (basic)
router.post("/:form_id/responses", authMiddleware, policyMiddleware("forms.view_responses"), validateBody(formResponsesSchema), formResponses);

// Get form responses with column visibility and calculated columns
router.post("/:form_id/responses/columns", authMiddleware, policyMiddleware("forms.view_responses"), validateBody(formResponsesWithColumnsSchema), formResponsesWithColumns);

module.exports = router;
