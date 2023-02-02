
function errorHandler(error,req,res,next){
  console.log(error)
  let statusCode = 500;
  let message = {message:'Internal Server Error'}
  switch (error.name) {
    case "NotFound":
      statusCode = 404;
      message = { message: "Data Unavailable" };
      break;

    default:
      break;
  }
  res.status(statusCode).json(message)
}

module.exports = errorHandler;