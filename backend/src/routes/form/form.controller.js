import { asyncHandler } from "../../utils/async.util.js";
import { sendSuccess } from "../../utils/response.util.js";
import {
  fnFormAddAccess,
  fnFormCreate,
  fnFormDelete,
  fnFormGet,
  fnFormList,
  fnFormListTableColumns,
  fnFormListTables,
  fnFormResponses,
  fnFormSubmit,
  fnFormUpdate,
} from "./form.service.js";

export const formAddAccess = asyncHandler(async (req, res) => {
  const { access_type, access_value, expires_at } = req.body;
  const result = await fnFormAddAccess(req.params.id, access_type, access_value, expires_at);
  sendSuccess(res, result, "Access added successfully", 201);
});

export const formCreate = asyncHandler(async (req, res) => {
  const { description, name, fields } = req.body;
  const form = await fnFormCreate(name, description, req.user.id, fields);
  sendSuccess(res, { form }, "Form created successfully", 201);
});

export const formDelete = asyncHandler(async (req, res) => {
  await fnFormDelete(req.params.id);
  sendSuccess(res, null, "Form deleted successfully");
});

export const formGet = asyncHandler(async (req, res) => {
  const form = await fnFormGet(req.params.id);
  sendSuccess(res, { form });
});

export const formList = asyncHandler(async (req, res) => {
  const { limit, page, search } = req.query;
  const result = await fnFormList({
    limit: parseInt(limit) || 10,
    page: parseInt(page) || 1,
    search,
  });
  sendSuccess(res, result);
});

export const formSubmit = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const result = await fnFormSubmit(req.params.id, req.user?.id || null, answers);
  sendSuccess(res, result, "Form submitted successfully", 201);
});

export const formUpdate = asyncHandler(async (req, res) => {
  const form = await fnFormUpdate(req.params.id, req.body);
  sendSuccess(res, { form }, "Form updated successfully");
});

export const formResponses = asyncHandler(async (req, res) => {
  const responses = await fnFormResponses(req.params.id);
  sendSuccess(res, { responses });
});

export const formTables = asyncHandler(async (req, res) => {
  const { prefix } = req.query;
  const tables = await fnFormListTables(prefix || "system_");
  sendSuccess(res, { tables });
});

export const formTableColumns = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { prefix } = req.query;
  const columns = await fnFormListTableColumns(name, prefix || "system_");
  sendSuccess(res, { columns });
});
