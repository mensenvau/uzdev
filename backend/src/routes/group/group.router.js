const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { policyMiddleware } = require('../../middlewares/policy.middleware');
const { validateBody } = require('../../middlewares/validate.middleware');
const { schemaGroupCreate, schemaGroupUpdate, schemaGroupUser } = require('./group.schema');
const { groupAssign, groupCreate, groupDelete, groupGet, groupList, groupRemove, groupUpdate } = require('./group.controller');

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("group.list"), groupList);
router.get("/:id", authMiddleware, policyMiddleware("group.get"), groupGet);
router.post("/", authMiddleware, policyMiddleware("group.create"), validateBody(schemaGroupCreate), groupCreate);
router.put("/:id", authMiddleware, policyMiddleware("group.edit"), validateBody(schemaGroupUpdate), groupUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("group.delete"), groupDelete);
router.post("/assign", authMiddleware, policyMiddleware("group.assign"), validateBody(schemaGroupUser), groupAssign);
router.post("/remove", authMiddleware, policyMiddleware("group.remove"), validateBody(schemaGroupUser), groupRemove);

module.exports = router;
