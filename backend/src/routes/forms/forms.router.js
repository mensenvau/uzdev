const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody, validateParams } = require("../../middlewares/validate.middleware");
const {
  schemaFormsList,
  schemaFormGet,
  schemaFormResponses,
  schemaFormResponsesWithColumns,
} = require("./forms.schema");
const {
  formsList,
  formGet,
  formGetPublic,
  formSubmitPublic,
  formResponses,
  formResponsesWithColumns,
} = require("./forms.controller");
const {
  schemaAssignFormToGroup,
  schemaFormId,
  schemaRemoveFormFromGroup,
} = require("../groups/groups.schema");
const {
  formGroupsList,
  assignFormToGroup,
  removeFormFromGroup,
} = require("../groups/groups.controller");

const router = express.Router();

router.post("/public/:form_id", validateParams(schemaFormGet), formGetPublic);
router.post("/public/:form_id/submit", formSubmitPublic);

router.post("/list", authMiddleware, policyMiddleware("forms.list"), validateBody(schemaFormsList), formsList);

router.post("/:form_id", authMiddleware, policyMiddleware("forms.get"), validateParams(schemaFormGet), formGet);

router.post("/:form_id/responses", authMiddleware, policyMiddleware("forms.view_responses"), validateParams(schemaFormResponses), validateBody(schemaFormResponses), formResponses);

router.post("/:form_id/responses/columns", authMiddleware, policyMiddleware("forms.view_responses"), validateParams(schemaFormResponsesWithColumns), validateBody(schemaFormResponsesWithColumns), formResponsesWithColumns);

router.get("/:form_id/groups", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaFormId), formGroupsList);

router.post("/:form_id/groups", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaFormId), validateBody(schemaAssignFormToGroup), assignFormToGroup);

router.delete("/:form_id/groups/:group_id", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaRemoveFormFromGroup), removeFormFromGroup);

module.exports = router;
