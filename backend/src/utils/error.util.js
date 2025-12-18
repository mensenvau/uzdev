/**
 * Error Utility
 * Error formatting helpers
 */

const formatApiError = (error) => {
  if (error?.errors && Array.isArray(error.errors)) {
    return error.errors.map((err) => err.message).join(', ');
  }
  return error.message || 'Unknown error';
};

module.exports = { formatApiError };
