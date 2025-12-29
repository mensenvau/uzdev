const express = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { policyMiddleware } = require("../../middlewares/policy.middleware");
const { validateBody } = require("../../middlewares/validate.middleware");
const { schemaUserCreate, schemaUserUpdate } = require("./user.schema");
const { userCreate, userDelete, userGet, userList, userUpdate } = require("./user.controller");

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("user.list"), userList);
router.get("/:id", authMiddleware, policyMiddleware("user.get"), userGet);
router.post("/", authMiddleware, policyMiddleware("user.create"), validateBody(schemaUserCreate), userCreate);
router.put("/:id", authMiddleware, policyMiddleware("user.edit"), validateBody(schemaUserUpdate), userUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("user.delete"), userDelete);

module.exports = router;
