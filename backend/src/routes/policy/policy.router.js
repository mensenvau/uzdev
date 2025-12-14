import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { policyMiddleware } from "../../middlewares/policy.middleware.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { schemaPolicyAssign, schemaPolicyCreate, schemaPolicyUpdate } from "./policy.schema.js";
import { policyAssign, policyCreate, policyDelete, policyGet, policyList, policyRemove, policyUpdate } from "./policy.controller.js";

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("policy.list"), policyList);
router.get("/:id", authMiddleware, policyMiddleware("policy.get"), policyGet);
router.post("/", authMiddleware, policyMiddleware("policy.create"), validateMiddleware(schemaPolicyCreate), policyCreate);
router.put("/:id", authMiddleware, policyMiddleware("policy.edit"), validateMiddleware(schemaPolicyUpdate), policyUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("policy.delete"), policyDelete);
router.post("/assign", authMiddleware, policyMiddleware("policy.assign"), validateMiddleware(schemaPolicyAssign), policyAssign);
router.post("/remove", authMiddleware, policyMiddleware("policy.remove"), validateMiddleware(schemaPolicyAssign), policyRemove);

export default router;
