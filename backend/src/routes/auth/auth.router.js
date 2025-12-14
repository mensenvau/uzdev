import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { policyMiddleware } from "../../middlewares/policy.middleware.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { schemaAuthGoogle, schemaAuthRefresh, schemaAuthSignIn, schemaAuthSignUp, schemaAuthForgot, schemaAuthReset } from "./auth.schema.js";
import { authForgot, authGetMe, authRefreshToken, authResetPassword, authSignIn, authSignInWithGoogle, authSignUp } from "./auth.controller.js";

const router = express.Router();

router.post("/signup", validateMiddleware(schemaAuthSignUp), authSignUp);
router.post("/signin", validateMiddleware(schemaAuthSignIn), authSignIn);
router.post("/google", validateMiddleware(schemaAuthGoogle), authSignInWithGoogle);
router.post("/refresh-token", validateMiddleware(schemaAuthRefresh), authRefreshToken);
router.post("/forgot-password", validateMiddleware(schemaAuthForgot), authForgot);
router.post("/reset-password", validateMiddleware(schemaAuthReset), authResetPassword);
router.get("/me", authMiddleware, policyMiddleware("me.get"), authGetMe);

export default router;
