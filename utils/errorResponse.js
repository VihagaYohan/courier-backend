class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(mesage);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
