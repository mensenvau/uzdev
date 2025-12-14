import { asyncHandler } from "../../utils/async.util.js";
import { sendError, sendSuccess } from "../../utils/response.util.js";
import { fnUserCreate, fnUserDelete, fnUserGet, fnUserList, fnUserUpdate } from "./user.service.js";

export const userCreate = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name, phone } = req.body;
  const user = await fnUserCreate(email, password, first_name, last_name, phone);
  sendSuccess(res, { user }, "User created successfully", 201);
});

export const userDelete = asyncHandler(async (req, res) => {
  await fnUserDelete(req.params.id);
  sendSuccess(res, null, "User deleted successfully");
});

export const userGet = asyncHandler(async (req, res) => {
  const user = await fnUserGet(req.params.id);
  sendSuccess(res, { user });
});

export const userList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnUserList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

export const userUpdate = asyncHandler(async (req, res) => {
  const user = await fnUserUpdate(req.params.id, req.body);
  sendSuccess(res, { user }, "User updated successfully");
});
