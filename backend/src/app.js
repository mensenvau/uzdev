import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth/auth.router.js";
import formRouter from "./routes/form/form.router.js";
import groupRouter from "./routes/group/group.router.js";
import policyRouter from "./routes/policy/policy.router.js";
import roleRouter from "./routes/role/role.router.js";
import departmentRouter from "./routes/department/department.router.js";
import userRouter from "./routes/user/user.router.js";

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
app.use("/api/groups", groupRouter);
app.use("/api/policies", policyRouter);
app.use("/api/roles", roleRouter);
app.use("/api/departments", departmentRouter);
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

export default app;
