import { asyncHandler } from "../../utils/async.util.js";
import { sendSuccess } from "../../utils/response.util.js";
import { fnUserGet } from "../user/user.service.js";
import { fnAuthForgotPassword, fnAuthRefreshToken, fnAuthResetPassword, fnAuthSignIn, fnAuthSignInWithGoogle, fnAuthSignUp } from "./auth.service.js";

export const authGetMe = asyncHandler(async (req, res) => {
  const user = await fnUserGet(req.user.id);
  sendSuccess(res, { user });
});

export const authRefreshToken = asyncHandler(async (req, res) => {
  const result = await fnAuthRefreshToken(req.body.refresh_token);
  sendSuccess(res, result);
});

export const authSignIn = asyncHandler(async (req, res) => {
  const result = await fnAuthSignIn(req.body.email, req.body.password);
  sendSuccess(res, result);
});

export const authSignInWithGoogle = asyncHandler(async (req, res) => {
  const { id_token } = req.body;
  const result = await fnAuthSignInWithGoogle(id_token);
  sendSuccess(res, result);
});

export const authSignUp = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name, phone } = req.body;
  const result = await fnAuthSignUp(email, first_name, last_name, phone, password);
  sendSuccess(res, result, "User registered successfully", 201);
});

export const authForgot = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await fnAuthForgotPassword(email);
  sendSuccess(res, null, "Reset link sent if email exists");
});

export const authResetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  await fnAuthResetPassword(token, password);
  sendSuccess(res, null, "Password reset successful");
});
