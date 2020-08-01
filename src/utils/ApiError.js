const ExtendableError = require("./ExtentableError");
const httpStatus = require("http-status");

class ApiError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    data,
    message,
    errors,
    stack,
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      errors,
      isPublic,
      message,
      stack,
      statusCode,
      data,
    });
  }
}

module.exports = ApiError;
