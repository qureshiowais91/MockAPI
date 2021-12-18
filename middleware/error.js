const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  let error = { ...err };
  error.message = err.message;
  // bad request
  if (err.name === "CastError") {
    const message = `Cat not Found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // duplicate key
  // if (err.code === 11000) {
  //   const message = `Cat not Found ${err.value}`;
  //   error = new ErrorResponse(message, 404);
  // }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
