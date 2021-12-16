const ErrorResponse = require("../utils/errorRespons");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  let error = { ...err };
  error.message = err.message;
  
  if (err.name === "CastError") {
    const message = `Cat not Found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
