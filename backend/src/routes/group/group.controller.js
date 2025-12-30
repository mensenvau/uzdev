const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const {
  fnGroupAssign,
  fnGroupCreate,
  fnGroupDelete,
  fnGroupGet,
  fnGroupList,
  fnGroupRemove,
  fnGroupUpdate,
  fnGetFormGroups,
  fnAssignFormToGroup,
  fnRemoveFormFromGroup,
} = require("./group.service");

const groupAssign = asyncHandler(async (req, res) => {
  const { group_id, user_id } = req.body;
  await fnGroupAssign(group_id, user_id);
  sendSuccess(res, null, "User added to group successfully");
});

const groupCreate = asyncHandler(async (req, res) => {
  const { description, name } = req.body;
  const group = await fnGroupCreate(name, description);
  sendSuccess(res, { group }, "Group created successfully", 201);
});

const groupDelete = asyncHandler(async (req, res) => {
  await fnGroupDelete(req.params.id);
  sendSuccess(res, null, "Group deleted successfully");
});

const groupGet = asyncHandler(async (req, res) => {
  const group = await fnGroupGet(req.params.id);
  sendSuccess(res, { group });
});

const groupList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnGroupList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

const groupRemove = asyncHandler(async (req, res) => {
  const { group_id, user_id } = req.body;
  await fnGroupRemove(group_id, user_id);
  sendSuccess(res, null, "User removed from group successfully");
});

const groupUpdate = asyncHandler(async (req, res) => {
  const group = await fnGroupUpdate(req.params.id, req.body);
  sendSuccess(res, { group }, "Group updated successfully");
});

const groupFormGroupsList = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const groups = await fnGetFormGroups({ form_id });
  sendSuccess(res, { groups }, "Form groups fetched successfully");
});

const groupAssignFormToGroup = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const { group_id } = req.body;

  const result = await fnAssignFormToGroup({ form_id, group_id });
  sendSuccess(res, result, "Form assigned to group successfully", 201);
});

const groupRemoveFormFromGroup = asyncHandler(async (req, res) => {
  const { form_id, group_id } = req.params;

  const result = await fnRemoveFormFromGroup({ form_id, group_id });
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
  groupRemoveFormFromGroup,
};
