import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { policyMiddleware } from "../../middlewares/policy.middleware.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { schemaRoleAssign, schemaRoleCreate, schemaRoleUpdate } from "./role.schema.js";
import { roleAssign, roleCreate, roleDelete, roleGet, roleList, roleRemove, roleUpdate } from "./role.controller.js";

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("role.list"), roleList);
router.get("/:id", authMiddleware, policyMiddleware("role.get"), roleGet);
router.post("/", authMiddleware, policyMiddleware("role.create"), validateMiddleware(schemaRoleCreate), roleCreate);
router.put("/:id", authMiddleware, policyMiddleware("role.edit"), validateMiddleware(schemaRoleUpdate), roleUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("role.delete"), roleDelete);
router.post("/assign", authMiddleware, policyMiddleware("role.assign"), validateMiddleware(schemaRoleAssign), roleAssign);
router.post("/remove", authMiddleware, policyMiddleware("role.remove"), validateMiddleware(schemaRoleAssign), roleRemove);

export default router;
