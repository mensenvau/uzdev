import { sendValidationError } from '../utils/response.util.js'

export function validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      const errors = {}
      error.errors.forEach(err => {
        errors[err.path[0]] = err.message
      })
      return sendValidationError(res, errors)
    }
  }
}

export default validate
