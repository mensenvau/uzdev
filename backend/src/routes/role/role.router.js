const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody } = require("../../middlewares/validate.middleware");
const { schemaRoleAssign, schemaRoleCreate, schemaRoleUpdate } = require("./role.schema");
const { roleAssign, roleCreate, roleDelete, roleGet, roleList, roleRemove, roleUpdate } = require("./role.controller");

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("role.list"), roleList);
router.get("/:id", authMiddleware, policyMiddleware("role.get"), roleGet);
router.post("/", authMiddleware, policyMiddleware("role.create"), validateBody(schemaRoleCreate), roleCreate);
router.put("/:id", authMiddleware, policyMiddleware("role.edit"), validateBody(schemaRoleUpdate), roleUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("role.delete"), roleDelete);
router.post("/assign", authMiddleware, policyMiddleware("role.assign"), validateBody(schemaRoleAssign), roleAssign);
router.post("/remove", authMiddleware, policyMiddleware("role.remove"), validateBody(schemaRoleAssign), roleRemove);

module.exports = router;
