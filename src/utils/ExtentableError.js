class ExtendableError extends Error {
  constructor({ data, message, errors, statusCode, isPublic, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.statusCode = statusCode;
    this.isPublic = isPublic;
    this.stack = stack;
    this.data = data;
  }
}

module.exports = ExtendableError;
