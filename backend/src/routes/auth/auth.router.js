const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { policyMiddleware } = require('../../middlewares/policy.middleware');
const { validateBody } = require('../../middlewares/validate.middleware');
const { schemaAuthGoogle, schemaAuthRefresh, schemaAuthSignIn, schemaAuthSignUp, schemaAuthForgot, schemaAuthReset } = require('./auth.schema');
const { authForgot, authGetMe, authRefreshToken, authResetPassword, authSignIn, authSignInWithGoogle, authSignUp } = require('./auth.controller');

const router = express.Router();

router.post("/signup", validateBody(schemaAuthSignUp), authSignUp);
router.post("/signin", validateBody(schemaAuthSignIn), authSignIn);
router.post("/google", validateBody(schemaAuthGoogle), authSignInWithGoogle);
router.post("/refresh-token", validateBody(schemaAuthRefresh), authRefreshToken);
router.post("/forgot-password", validateBody(schemaAuthForgot), authForgot);
router.post("/reset-password", validateBody(schemaAuthReset), authResetPassword);
router.get("/me", authMiddleware, policyMiddleware("me.get"), authGetMe);

module.exports = router;
