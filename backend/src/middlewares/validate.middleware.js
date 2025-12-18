/**
 * Validation Middleware
 * Validates request data using Zod schemas
 */

const { sendError } = require('../utils/response.util');
const { formatApiError } = require('../utils/error.util');

/**
 * Create validation middleware for request body
 * @param {ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware
 */
function validateBody(schema) {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      const message = formatApiError(error);
      return sendError(res, message, 422);
    }
  };
}

/**
 * Create validation middleware for query parameters
 * @param {ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware
 */
function validateQuery(schema) {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync(req.query);
      req.query = validated;
      next();
    } catch (error) {
      const message = formatApiError(error);
      return sendError(res, message, 422);
    }
  };
}

/**
 * Create validation middleware for URL parameters
 * @param {ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware
 */
function validateParams(schema) {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync(req.params);
      req.params = validated;
      next();
    } catch (error) {
      const message = formatApiError(error);
      return sendError(res, message, 422);
    }
  };
}

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
};
