import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { policyMiddleware } from "../../middlewares/policy.middleware.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { schemaUserCreate, schemaUserUpdate } from "./user.schema.js";
import { userCreate, userDelete, userGet, userList, userUpdate } from "./user.controller.js";

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("user.list"), userList);
router.get("/:id", authMiddleware, policyMiddleware("user.get"), userGet);
router.post("/", authMiddleware, policyMiddleware("user.create"), validateMiddleware(schemaUserCreate), userCreate);
router.put("/:id", authMiddleware, policyMiddleware("user.edit"), validateMiddleware(schemaUserUpdate), userUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("user.delete"), userDelete);

export default router;
