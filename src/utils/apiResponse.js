const httpStatus = require("http-status");

module.exports = function apiResponse(typeOrMessage, data) {
  let message = "";
  let statusCode = httpStatus.OK;

  switch (typeOrMessage) {
    case "FETCH":
      message = "Resource fetched successfully";
      break;

    case "UPDATE":
      message = "Resource updated successfully";
      break;

    case "DELETE":
      message = "Resource deleted successfully";
      break;

    case "CREATED":
      message = "Resource created successfully";
      statusCode = httpStatus.CREATED;
      break;

    default:
      message = typeOrMessage;
      break;
  }

  return {
    statusCode,
    message,
    data,
  };
};
