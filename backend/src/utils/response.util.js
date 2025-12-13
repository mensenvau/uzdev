export function sendSuccess(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  })
}

export function sendError(res, message = 'Error', statusCode = 400, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  })
}

export function sendValidationError(res, errors) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed',
    errors
  })
}

export function sendUnauthorized(res, message = 'Unauthorized') {
  return res.status(401).json({
    success: false,
    message
  })
}

export function sendForbidden(res, message = 'Forbidden') {
  return res.status(403).json({
    success: false,
    message
  })
}

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
