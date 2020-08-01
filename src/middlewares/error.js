const httpStatus = require("http-status");
const { environment } = require("../config/env");
const { ValidationError } = require("express-validation");
const ApiError = require("../utils/ApiError");

/**
 *  Error handler. Send stacktrace when in development env
 *  @public
 * */
const handler = (err, req, res, next) => {
  const response = {
    statusCode: err.statusCode,
    errors: err.errors,
    message: err.message || httpStatus[err.status],
    stack: err.stack,
    data: err.data,
  };
  if (environment !== "development") delete response.stack;
  const statusCode = err.statusCode
    ? err.statusCode
    : httpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf Error, convert it.
 * @public
 * */
exports.converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof ValidationError) {
    const errors = {};
    const { body, headers, params, query } = err.details;

    if (body) {
      errors.body = body.map(({ message }) => message);
    }
    if (headers) {
      errors.headers = headers.map(({ message }) => message);
    }
    if (params) {
      errors.params = params.map(({ message }) => message);
    }
    if (query) {
      errors.query = query.map(({ message }) => message);
    }

    convertedError = new ApiError({
      statusCode: err.statusCode,
      message: err.error,
      errors,
      stack: err.stack,
    });
  } else if (!(err instanceof ApiError)) {
    convertedError = new ApiError({
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
    });
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 */
exports.notFound = (req, res) => {
  const err = new ApiError({
    message: "Not found",
    statusCode: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
