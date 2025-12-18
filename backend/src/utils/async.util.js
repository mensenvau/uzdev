/**
 * Async Handler Utility
 * Wraps async route handlers to catch errors
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
