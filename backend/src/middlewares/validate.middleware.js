import { sendValidationError } from "../utils/response.util.js";

export function validateMiddleware(schema) {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      const errors = {};
      const issues = error.issues;
      for (const issue of issues) {
        errors[issue.path?.[0] || "unknown"] = issue.message;
      }
      return sendValidationError(res, errors);
    }
  };
}

export default validateMiddleware;
