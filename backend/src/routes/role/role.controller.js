import { asyncHandler } from "../../utils/async.util.js";
import { sendSuccess } from "../../utils/response.util.js";
import { fnRoleAssign, fnRoleCreate, fnRoleDelete, fnRoleGet, fnRoleList, fnRoleRemove, fnRoleUpdate } from "./role.service.js";

export const roleAssign = asyncHandler(async (req, res) => {
  const { role_id, user_id } = req.body;
  await fnRoleAssign(user_id, role_id);
  sendSuccess(res, null, "Role assigned successfully");
});

export const roleCreate = asyncHandler(async (req, res) => {
  const { description, name } = req.body;
  const role = await fnRoleCreate(name, description);
  sendSuccess(res, { role }, "Role created successfully", 201);
});

export const roleDelete = asyncHandler(async (req, res) => {
  await fnRoleDelete(req.params.id);
  sendSuccess(res, null, "Role deleted successfully");
});

export const roleGet = asyncHandler(async (req, res) => {
  const role = await fnRoleGet(req.params.id);
  sendSuccess(res, { role });
});

export const roleList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnRoleList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

export const roleRemove = asyncHandler(async (req, res) => {
  const { role_id, user_id } = req.body;
  await fnRoleRemove(user_id, role_id);
  sendSuccess(res, null, "Role removed successfully");
});

export const roleUpdate = asyncHandler(async (req, res) => {
  const role = await fnRoleUpdate(req.params.id, req.body);
  sendSuccess(res, { role }, "Role updated successfully");
});
