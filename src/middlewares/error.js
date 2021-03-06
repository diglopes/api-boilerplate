const httpStatus = require("http-status");
const { environment } = require("../config/env");
const { ValidationError } = require("express-validation");
const ApiError = require("../utils/ApiError");

function handler(err, req, res) {
  const isProd = environment === "production";
  const message = isProd ? httpStatus[err.statusCode] : err.message;
  const statusCode = err.statusCode
    ? err.statusCode
    : httpStatus.INTERNAL_SERVER_ERROR;

  const response = {
    statusCode: err.statusCode,
    errors: err.errors,
    message,
    stack: isProd ? undefined : err.stack,
    data: err.data,
  };
  res.status(statusCode);
  res.json(response);
}

function converter(err, req, res, next) {
  let convertedError = err;
  if (err instanceof ValidationError) {
    const errors = {};
    const parameters = Object.keys(err.details);
    const extractMessage = ({ message }) => message;
    parameters.forEach(
      (param) => (errors[param] = err.details[param].map(extractMessage))
    );

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
}

function notFound(req, res) {
  const err = new ApiError({
    message: "Not found",
    statusCode: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
}

module.exports = {
  converter,
  notFound,
  handler,
};
