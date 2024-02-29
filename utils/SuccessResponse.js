class SuccessResponse {
  constructor(success, message, statusCode, data) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = SuccessResponse;
