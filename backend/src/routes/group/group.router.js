import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { policyMiddleware } from "../../middlewares/policy.middleware.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { schemaGroupCreate, schemaGroupUpdate, schemaGroupUser } from "./group.schema.js";
import { groupAssign, groupCreate, groupDelete, groupGet, groupList, groupRemove, groupUpdate } from "./group.controller.js";

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("group.list"), groupList);
router.get("/:id", authMiddleware, policyMiddleware("group.get"), groupGet);
router.post("/", authMiddleware, policyMiddleware("group.create"), validateMiddleware(schemaGroupCreate), groupCreate);
router.put("/:id", authMiddleware, policyMiddleware("group.edit"), validateMiddleware(schemaGroupUpdate), groupUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("group.delete"), groupDelete);
router.post("/assign", authMiddleware, policyMiddleware("group.assign"), validateMiddleware(schemaGroupUser), groupAssign);
router.post("/remove", authMiddleware, policyMiddleware("group.remove"), validateMiddleware(schemaGroupUser), groupRemove);

export default router;
