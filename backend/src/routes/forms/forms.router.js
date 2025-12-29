const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody, validateParams } = require("../../middlewares/validate.middleware");
const {
  formsListSchema,
  formGetSchema,
  formResponsesSchema,
  formResponsesWithColumnsSchema,
} = require("./forms.schema");
const {
  formsList,
  formGet,
  formGetPublic,
  formSubmitPublic,
  formResponses,
  formResponsesWithColumns,
} = require("./forms.controller");

const router = express.Router();

router.post("/public/:form_id", validateParams(formGetSchema), formGetPublic);
router.post("/public/:form_id/submit", formSubmitPublic);

router.post("/list", authMiddleware, policyMiddleware("forms.list"), validateBody(formsListSchema), formsList);

router.post("/:form_id", authMiddleware, policyMiddleware("forms.view"), validateParams(formGetSchema), formGet);

router.post("/:form_id/responses", authMiddleware, policyMiddleware("forms.view_responses"), validateParams(formResponsesSchema), validateBody(formResponsesSchema), formResponses);

router.post("/:form_id/responses/columns", authMiddleware, policyMiddleware("forms.view_responses"), validateParams(formResponsesWithColumnsSchema), validateBody(formResponsesWithColumnsSchema), formResponsesWithColumns);

module.exports = router;
