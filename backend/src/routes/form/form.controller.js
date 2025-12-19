const { asyncHandler } = require("../../utils/async.util");
const { sendSuccess } = require("../../utils/response.util");
const { fnFormAddAccess, fnFormCreate, fnFormDelete, fnFormGet, fnFormList, fnFormResponses, fnFormSearchColumns, fnFormSubmit, fnFormUpdate, fnFormColumnValues } = require("./form.service");

const formAddAccess = asyncHandler(async (req, res) => {
  const { access_type, access_value, expires_at } = req.body;
  const result = await fnFormAddAccess(req.params.id, access_type, access_value, expires_at);
  sendSuccess(res, result, "Access added successfully", 201);
});

const formCreate = asyncHandler(async (req, res) => {
  const { description, name, fields } = req.body;
  const form = await fnFormCreate(name, description, req.user.id, fields);
  sendSuccess(res, { form }, "Form created successfully", 201);
});

const formDelete = asyncHandler(async (req, res) => {
  await fnFormDelete(req.params.id);
  sendSuccess(res, null, "Form deleted successfully");
});

const formGet = asyncHandler(async (req, res) => {
  const form = await fnFormGet(req.params.id);
  sendSuccess(res, { form });
});

const formList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnFormList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

const formSubmit = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const result = await fnFormSubmit(req.params.id, req.user?.id || null, answers);
  sendSuccess(res, result, "Form submitted successfully", 201);
});

const formUpdate = asyncHandler(async (req, res) => {
  const form = await fnFormUpdate(req.params.id, req.body);
  sendSuccess(res, { form }, "Form updated successfully");
});

const formResponses = asyncHandler(async (req, res) => {
  const responses = await fnFormResponses(req.params.id);
  sendSuccess(res, { responses });
});

const formColumns = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const columns = await fnFormSearchColumns(q || "");
  sendSuccess(res, { columns });
});

const formColumnValues = asyncHandler(async (req, res) => {
  const { table, value_column, label_column } = req.query;
  const rows = await fnFormColumnValues(table, value_column, label_column);
  sendSuccess(res, { rows });
});

module.exports = {
  formAddAccess,
  formCreate,
  formDelete,
  formGet,
  formList,
  formSubmit,
  formUpdate,
  formResponses,
  formColumns,
  formColumnValues,
};
