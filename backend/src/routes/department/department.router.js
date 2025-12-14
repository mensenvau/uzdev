import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { policyMiddleware } from "../../middlewares/policy.middleware.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { departmentAssign, departmentCreate, departmentDelete, departmentGet, departmentList, departmentRemove, departmentUpdate } from "./department.controller.js";
import { schemaDepartmentAssign, schemaDepartmentCreate, schemaDepartmentUpdate } from "./department.schema.js";

const router = express.Router();

router.get("/", authMiddleware, policyMiddleware("department.list"), departmentList);
router.get("/:id", authMiddleware, policyMiddleware("department.get"), departmentGet);
router.post("/", authMiddleware, policyMiddleware("department.create"), validateMiddleware(schemaDepartmentCreate), departmentCreate);
router.put("/:id", authMiddleware, policyMiddleware("department.edit"), validateMiddleware(schemaDepartmentUpdate), departmentUpdate);
router.delete("/:id", authMiddleware, policyMiddleware("department.delete"), departmentDelete);
router.post("/:id/assign", authMiddleware, policyMiddleware("department.assign"), validateMiddleware(schemaDepartmentAssign), departmentAssign);
router.post("/:id/remove", authMiddleware, policyMiddleware("department.remove"), validateMiddleware(schemaDepartmentAssign), departmentRemove);

export default router;
