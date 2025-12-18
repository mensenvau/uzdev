const { asyncHandler } = require('../../utils/async.util');
const { sendError, sendSuccess } = require('../../utils/response.util');
const { fnUserCreate, fnUserDelete, fnUserGet, fnUserList, fnUserUpdate } = require('./user.service');

const userCreate = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name, phone } = req.body;
  const user = await fnUserCreate(email, password, first_name, last_name, phone);
  sendSuccess(res, { user }, "User created successfully", 201);
});

const userDelete = asyncHandler(async (req, res) => {
  await fnUserDelete(req.params.id);
  sendSuccess(res, null, "User deleted successfully");
});

const userGet = asyncHandler(async (req, res) => {
  const user = await fnUserGet(req.params.id);
  sendSuccess(res, { user });
});

const userList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnUserList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

const userUpdate = asyncHandler(async (req, res) => {
  const user = await fnUserUpdate(req.params.id, req.body);
  sendSuccess(res, { user }, "User updated successfully");
});

module.exports = {
  userCreate,
  userDelete,
  userGet,
  userList,
  userUpdate,
};
