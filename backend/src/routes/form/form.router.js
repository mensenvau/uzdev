const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody } = require("../../middlewares/validate.middleware");
const { schemaFormAccess, schemaFormCreate, schemaFormSubmit, schemaFormUpdate } = require("./form.schema");
const { formAddAccess, formColumns, formColumnValues, formCreate, formDelete, formGet, formGetPublic, formList, formResponses, formResponseDetail, formSubmit, formUpdate } = require("./form.controller");

const router = express.Router();

router.get("/:id/public", formGetPublic);
router.get("/meta/columns", authMiddleware, policyMiddleware("form.list"), formColumns);
router.get("/meta/column-values", authMiddleware, policyMiddleware("form.list"), formColumnValues);
router.get("/", authMiddleware, policyMiddleware("form.list"), formList);
router.get("/:id", authMiddleware, policyMiddleware("form.get"), formGet);
router.get("/:id/responses", authMiddleware, policyMiddleware("form.view_responses"), formResponses);
router.get("/:id/responses/:responseId", authMiddleware, policyMiddleware("form.view_responses"), formResponseDetail);
router.post("/", authMiddleware, policyMiddleware("form.create"), validateBody(schemaFormCreate), formCreate);
router.put("/:id", authMiddleware, policyMiddleware("form.edit"), validateBody(schemaFormUpdate), formUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("form.delete"), formDelete);
router.post("/:id/access", authMiddleware, policyMiddleware("form.add_access"), validateBody(schemaFormAccess), formAddAccess);
router.post("/:id/submit", validateBody(schemaFormSubmit), formSubmit);

module.exports = router;
