const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const {
  assignGroup,
  createGroup,
  deleteGroup,
  getGroup,
  listGroups,
  removeGroup,
  updateGroup,
  getFormGroups,
  assignFormToGroup,
  removeFormFromGroup
} = require("./group.service");

const groupAssign = asyncHandler(async (req, res) => {
  const { group_id, user_id } = req.body;
  await assignGroup(group_id, user_id);
  sendSuccess(res, null, "User added to group successfully");
});

const groupCreate = asyncHandler(async (req, res) => {
  const { description, name } = req.body;
  const group = await createGroup(name, description);
  sendSuccess(res, { group }, "Group created successfully", 201);
});

const groupDelete = asyncHandler(async (req, res) => {
  await deleteGroup(req.params.id);
  sendSuccess(res, null, "Group deleted successfully");
});

const groupGet = asyncHandler(async (req, res) => {
  const group = await getGroup(req.params.id);
  sendSuccess(res, { group });
});

const groupList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await listGroups({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search
  });
  sendSuccess(res, result);
});

const groupRemove = asyncHandler(async (req, res) => {
  const { group_id, user_id } = req.body;
  await removeGroup(group_id, user_id);
  sendSuccess(res, null, "User removed from group successfully");
});

const groupUpdate = asyncHandler(async (req, res) => {
  const group = await updateGroup(req.params.id, req.body);
  sendSuccess(res, { group }, "Group updated successfully");
});

const groupFormGroupsList = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const groups = await getFormGroups({ form_id });
  sendSuccess(res, { groups }, "Form groups fetched successfully");
});

const groupAssignFormToGroup = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const { group_id } = req.body;

  const result = await assignFormToGroup({ form_id, group_id });
  sendSuccess(res, result, "Form assigned to group successfully", 201);
});

const groupRemoveFormFromGroup = asyncHandler(async (req, res) => {
  const { form_id, group_id } = req.params;

  const result = await removeFormFromGroup({ form_id, group_id });
  sendSuccess(res, result, "Form removed from group successfully");
});

module.exports = {
  groupAssign,
  groupCreate,
  groupDelete,
  groupGet,
  groupList,
  groupRemove,
  groupUpdate,
  groupFormGroupsList,
  groupAssignFormToGroup,
  groupRemoveFormFromGroup
};
