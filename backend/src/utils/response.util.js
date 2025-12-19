/**
 * Response Utility
 * Standardized API response helpers
 */

const sendSuccess = (res, data, message = "Success", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message = "Error", status = 400) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

const sendUnauthorized = (res, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message,
  });
};

const sendForbidden = (res, message = "Forbidden") => {
  return res.status(403).json({
    success: false,
    message,
  });
};

const sendNotFound = (res, message = "Not found") => {
  return res.status(404).json({
    success: false,
    message,
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
};
