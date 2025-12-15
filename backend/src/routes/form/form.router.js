import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { policyMiddleware } from "../../middlewares/policy.middleware.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { schemaFormAccess, schemaFormCreate, schemaFormSubmit, schemaFormUpdate } from "./form.schema.js";
import { formAddAccess, formCreate, formDelete, formGet, formList, formResponses, formSubmit, formTables, formTableColumns, formUpdate } from "./form.controller.js";

const router = express.Router();

router.get("/meta/tables", authMiddleware, policyMiddleware("form.list"), formTables);
router.get("/meta/tables/:name/columns", authMiddleware, policyMiddleware("form.list"), formTableColumns);
router.get("/", authMiddleware, policyMiddleware("form.list"), formList);
router.get("/:id", authMiddleware, policyMiddleware("form.get"), formGet);
router.get("/:id/responses", authMiddleware, policyMiddleware("form.view_responses"), formResponses);
router.post("/", authMiddleware, policyMiddleware("form.create"), validateMiddleware(schemaFormCreate), formCreate);
router.put("/:id", authMiddleware, policyMiddleware("form.edit"), validateMiddleware(schemaFormUpdate), formUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("form.delete"), formDelete);
router.post("/:id/access", authMiddleware, policyMiddleware("form.add_access"), validateMiddleware(schemaFormAccess), formAddAccess);
router.post("/:id/submit", validateMiddleware(schemaFormSubmit), formSubmit);

export default router;
