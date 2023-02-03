function errorHandler(error, req, res, next) {
  console.log(error);
  let statusCode = 500;
  let message = { message: "Internal Server Error" };
  switch (error.name) {
    case "NotFound":
      statusCode = 404;
      message = { message: "Data Unavailable" };
      break;
    case "InvalidInput":
      statusCode = 400;
      message = { message: `No document(s) matched.` };
    case "InvalidToken":
      statusCode = 401;
      message = { message: "Authentication Fail" };
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      message = { message: "Authentication Fail" };
      break;
    case "LoginError":
      statusCode = 401;
      message = { message: "Invalid Account Number / Email" };
      break;
    default:
      break;
  }
  
  res.status(statusCode).json(message);
}

module.exports = errorHandler;
