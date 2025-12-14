import { asyncHandler } from "../../utils/async.util.js";
import { sendSuccess } from "../../utils/response.util.js";
import { formatApiError } from "../../utils/error.util.js";
import { fnGroupAssign, fnGroupCreate, fnGroupDelete, fnGroupGet, fnGroupList, fnGroupRemove, fnGroupUpdate } from "./group.service.js";

export const groupAssign = asyncHandler(async (req, res) => {
  const { group_id, user_id } = req.body;
  await fnGroupAssign(group_id, user_id);
  sendSuccess(res, null, "User added to group successfully");
});

export const groupCreate = asyncHandler(async (req, res) => {
  const { description, name } = req.body;
  const group = await fnGroupCreate(name, description);
  sendSuccess(res, { group }, "Group created successfully", 201);
});

export const groupDelete = asyncHandler(async (req, res) => {
  await fnGroupDelete(req.params.id);
  sendSuccess(res, null, "Group deleted successfully");
});

export const groupGet = asyncHandler(async (req, res) => {
  const group = await fnGroupGet(req.params.id);
  sendSuccess(res, { group });
});

export const groupList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnGroupList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

export const groupRemove = asyncHandler(async (req, res) => {
  const { group_id, user_id } = req.body;
  await fnGroupRemove(group_id, user_id);
  sendSuccess(res, null, "User removed from group successfully");
});

export const groupUpdate = asyncHandler(async (req, res) => {
  const group = await fnGroupUpdate(req.params.id, req.body);
  sendSuccess(res, { group }, "Group updated successfully");
});
