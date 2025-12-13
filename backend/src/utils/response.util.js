/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code
 */
export function sendSuccess(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  })
}

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {*} errors - Additional error details
 */
export function sendError(res, message = 'Error', statusCode = 400, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  })
}

/**
 * Send validation error response
 * @param {Object} res - Express response object
 * @param {Array|Object} errors - Validation errors
 */
export function sendValidationError(res, errors) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed',
    errors
  })
}

/**
 * Send unauthorized response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
export function sendUnauthorized(res, message = 'Unauthorized') {
  return res.status(401).json({
    success: false,
    message
  })
}

/**
 * Send forbidden response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
export function sendForbidden(res, message = 'Forbidden') {
  return res.status(403).json({
    success: false,
    message
  })
}

/**
 * Send not found response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
export function sendNotFound(res, message = 'Not found') {
  return res.status(404).json({
    success: false,
    message
  })
}

export default {
  sendSuccess,
  sendError,
  sendValidationError,
  sendUnauthorized,
  sendForbidden,
  sendNotFound
}
