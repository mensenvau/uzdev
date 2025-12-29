const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody, validateParams } = require("../../middlewares/validate.middleware");
const {
  schemaAssignFormToGroup,
  schemaFormId,
  schemaRemoveFormFromGroup,
} = require("./groups.schema");
const {
  groupsList,
  formGroupsList,
  assignFormToGroup,
  removeFormFromGroup,
} = require("./groups.controller");

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("group.list"), groupsList);

router.get("/forms/:form_id", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaFormId), formGroupsList);

router.post("/forms/:form_id", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaFormId), validateBody(schemaAssignFormToGroup), assignFormToGroup);

router.delete("/forms/:form_id/:group_id", authMiddleware, policyMiddleware("forms.manage_access"), validateParams(schemaRemoveFormFromGroup), removeFormFromGroup);

module.exports = router;
