const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody } = require("../../middlewares/validate.middleware");
const { schemaPolicyAssign, schemaPolicyCreate, schemaPolicyUpdate } = require("./policy.schema");
const { policyAssign, policyCreate, policyDelete, policyGet, policyList, policyRemove, policyUpdate } = require("./policy.controller");

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("policy.list"), policyList);
router.get("/:id", authMiddleware, policyMiddleware("policy.get"), policyGet);
router.post("/", authMiddleware, policyMiddleware("policy.create"), validateBody(schemaPolicyCreate), policyCreate);
router.put("/:id", authMiddleware, policyMiddleware("policy.edit"), validateBody(schemaPolicyUpdate), policyUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("policy.delete"), policyDelete);
router.post("/assign", authMiddleware, policyMiddleware("policy.assign"), validateBody(schemaPolicyAssign), policyAssign);
router.post("/remove", authMiddleware, policyMiddleware("policy.remove"), validateBody(schemaPolicyAssign), policyRemove);

module.exports = router;
