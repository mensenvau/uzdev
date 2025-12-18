const { asyncHandler } = require('../../utils/async.util');
const { sendSuccess } = require('../../utils/response.util');
const { fnPolicyAssign, fnPolicyCreate, fnPolicyDelete, fnPolicyGet, fnPolicyList, fnPolicyRemove, fnPolicyUpdate } = require('./policy.service');

const policyAssign = asyncHandler(async (req, res) => {
  const { policy_id, role_id } = req.body;
  await fnPolicyAssign(role_id, policy_id);
  sendSuccess(res, null, "Policy assigned successfully");
});

const policyCreate = asyncHandler(async (req, res) => {
  const { description, name } = req.body;
  const policy = await fnPolicyCreate(name, description);
  sendSuccess(res, { policy }, "Policy created successfully", 201);
});

const policyDelete = asyncHandler(async (req, res) => {
  await fnPolicyDelete(req.params.id);
  sendSuccess(res, null, "Policy deleted successfully");
});

const policyGet = asyncHandler(async (req, res) => {
  const policy = await fnPolicyGet(req.params.id);
  sendSuccess(res, { policy });
});

const policyList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnPolicyList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

const policyRemove = asyncHandler(async (req, res) => {
  const { policy_id, role_id } = req.body;
  await fnPolicyRemove(role_id, policy_id);
  sendSuccess(res, null, "Policy removed successfully");
});

const policyUpdate = asyncHandler(async (req, res) => {
  const policy = await fnPolicyUpdate(req.params.id, req.body);
  sendSuccess(res, { policy }, "Policy updated successfully");
});

module.exports = {
  policyAssign,
  policyCreate,
  policyDelete,
  policyGet,
  policyList,
  policyRemove,
  policyUpdate,
};
