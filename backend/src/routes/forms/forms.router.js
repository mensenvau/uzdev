const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody, validateParams } = require("../../middlewares/validate.middleware");
const {
  schemaFormsList,
  schemaFormGet,
  schemaFormResponses,
  schemaFormResponsesBody,
  schemaFormResponsesWithColumns,
  schemaFormResponsesWithColumnsBody,
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
} = require("../group/group.schema");
const {
  groupFormGroupsList,
  groupAssignFormToGroup,
  groupRemoveFormFromGroup,
} = require("../group/group.controller");

const router = express.Router();

router.post("/public/:form_id", validateParams(schemaFormGet), formGetPublic);
router.post("/public/:form_id/submit", formSubmitPublic);

router.post("/list", authMiddleware, policyMiddleware("forms.list"), validateBody(schemaFormsList), formsList);

router.post("/:form_id", authMiddleware, policyMiddleware("forms.get"), validateParams(schemaFormGet), formGet);

router.post(
  "/:form_id/responses",
  authMiddleware,
  policyMiddleware("forms.view_responses"),
  validateParams(schemaFormGet),
  validateBody(schemaFormResponsesBody),
  formResponses
);

router.post(
  "/:form_id/responses/columns",
  authMiddleware,
  policyMiddleware("forms.view_responses"),
  validateParams(schemaFormGet),
  validateBody(schemaFormResponsesWithColumnsBody),
  formResponsesWithColumns
);

router.get("/:form_id/groups", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaFormId), groupFormGroupsList);

router.post("/:form_id/groups", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaFormId), validateBody(schemaAssignFormToGroup), groupAssignFormToGroup);

router.delete("/:form_id/groups/:group_id", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaRemoveFormFromGroup), groupRemoveFormFromGroup);

module.exports = router;
