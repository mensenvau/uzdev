const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const { fnRoleAssign, fnRoleCreate, fnRoleDelete, fnRoleGet, fnRoleList, fnRoleRemove, fnRoleUpdate } = require("./role.service");

const roleAssign = asyncHandler(async (req, res) => {
  const { role_id, user_id } = req.body;
  await fnRoleAssign(user_id, role_id);
  sendSuccess(res, null, "Role assigned successfully");
});

const roleCreate = asyncHandler(async (req, res) => {
  const { description, name } = req.body;
  const role = await fnRoleCreate(name, description);
  sendSuccess(res, { role }, "Role created successfully", 201);
});

const roleDelete = asyncHandler(async (req, res) => {
  await fnRoleDelete(req.params.id);
  sendSuccess(res, null, "Role deleted successfully");
});

const roleGet = asyncHandler(async (req, res) => {
  const role = await fnRoleGet(req.params.id);
  sendSuccess(res, { role });
});

const roleList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnRoleList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

const roleRemove = asyncHandler(async (req, res) => {
  const { role_id, user_id } = req.body;
  await fnRoleRemove(user_id, role_id);
  sendSuccess(res, null, "Role removed successfully");
});

const roleUpdate = asyncHandler(async (req, res) => {
  const role = await fnRoleUpdate(req.params.id, req.body);
  sendSuccess(res, { role }, "Role updated successfully");
});

module.exports = {
  roleAssign,
  roleCreate,
  roleDelete,
  roleGet,
  roleList,
  roleRemove,
  roleUpdate,
};
