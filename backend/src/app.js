const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth/auth.router');
const formRouter = require('./routes/form/form.router');
const googleFormsRouter = require('./routes/google-forms/google-forms.router');
const groupRouter = require('./routes/group/group.router');
const policyRouter = require('./routes/policy/policy.router');
const roleRouter = require('./routes/role/role.router');
const userRouter = require('./routes/user/user.router');

const app = express();

app.use(helmet());
app.use(cors("*"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/forms", formRouter);
app.use("/api/google-forms", googleFormsRouter);
app.use("/api/groups", groupRouter);
app.use("/api/policies", policyRouter);
app.use("/api/roles", roleRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
