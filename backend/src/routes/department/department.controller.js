import { asyncHandler } from "../../utils/async.util.js";
import { sendSuccess } from "../../utils/response.util.js";
import { fnDepartmentAssign, fnDepartmentCreate, fnDepartmentDelete, fnDepartmentGet, fnDepartmentList, fnDepartmentRemove, fnDepartmentUpdate } from "./department.service.js";

export const departmentList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnDepartmentList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

export const departmentGet = asyncHandler(async (req, res) => {
  const department = await fnDepartmentGet(req.params.id);
  sendSuccess(res, { department });
});

export const departmentCreate = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const department = await fnDepartmentCreate(name, description);
  sendSuccess(res, { department }, "Department created successfully", 201);
});

export const departmentUpdate = asyncHandler(async (req, res) => {
  const department = await fnDepartmentUpdate(req.params.id, req.body);
  sendSuccess(res, { department }, "Department updated successfully");
});

export const departmentDelete = asyncHandler(async (req, res) => {
  await fnDepartmentDelete(req.params.id);
  sendSuccess(res, null, "Department deleted successfully");
});

export const departmentAssign = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  await fnDepartmentAssign(user_id, req.params.id);
  sendSuccess(res, null, "Department assigned successfully");
});

export const departmentRemove = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  await fnDepartmentRemove(user_id, req.params.id);
  sendSuccess(res, null, "Department removed successfully");
});
