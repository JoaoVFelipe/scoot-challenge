// Generic exception return
function ValidateExceptions(status, message, errors = []) {
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
  
  module.exports = ValidateExceptions;