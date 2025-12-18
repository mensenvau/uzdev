const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { policyMiddleware } = require('../../middlewares/policy.middleware');
const { validateBody } = require('../../middlewares/validate.middleware');
const { schemaFormAccess, schemaFormCreate, schemaFormSubmit, schemaFormUpdate } = require('./form.schema');
const { formAddAccess, formCreate, formDelete, formGet, formList, formResponses, formSubmit, formTables, formTableColumns, formUpdate } = require('./form.controller');

const router = express.Router();

router.get("/meta/tables", authMiddleware, policyMiddleware("form.list"), formTables);
router.get("/meta/tables/:name/columns", authMiddleware, policyMiddleware("form.list"), formTableColumns);
router.get("/", authMiddleware, policyMiddleware("form.list"), formList);
router.get("/:id", authMiddleware, policyMiddleware("form.get"), formGet);
router.get("/:id/responses", authMiddleware, policyMiddleware("form.view_responses"), formResponses);
router.post("/", authMiddleware, policyMiddleware("form.create"), validateBody(schemaFormCreate), formCreate);
router.put("/:id", authMiddleware, policyMiddleware("form.edit"), validateBody(schemaFormUpdate), formUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("form.delete"), formDelete);
router.post("/:id/access", authMiddleware, policyMiddleware("form.add_access"), validateBody(schemaFormAccess), formAddAccess);
router.post("/:id/submit", validateBody(schemaFormSubmit), formSubmit);

module.exports = router;
