const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const {
  fnGetAllGroups,
  fnGetFormGroups,
  fnAssignFormToGroup,
  fnRemoveFormFromGroup,
} = require("./groups.service");

const groupsList = asyncHandler(async (req, res) => {
  const groups = await fnGetAllGroups();
  sendSuccess(res, { groups }, "Groups fetched successfully");
});

const formGroupsList = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const groups = await fnGetFormGroups({ form_id });
  sendSuccess(res, { groups }, "Form groups fetched successfully");
});

const assignFormToGroup = asyncHandler(async (req, res) => {
  const { form_id } = req.params;
  const { group_id } = req.body;

  const result = await fnAssignFormToGroup({ form_id, group_id });
  sendSuccess(res, result, "Form assigned to group successfully", 201);
});

const removeFormFromGroup = asyncHandler(async (req, res) => {
  const { form_id, group_id } = req.params;

  const result = await fnRemoveFormFromGroup({ form_id, group_id });
  sendSuccess(res, result, "Form removed from group successfully");
});

module.exports = {
  groupsList,
  formGroupsList,
  assignFormToGroup,
  removeFormFromGroup,
};
