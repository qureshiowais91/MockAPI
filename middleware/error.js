const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);
  
  let error  = {...er}

  if(err.name==="CastError"){
  const message = `Cat not Found ${err.value}`;

  }
  
  res.status(err.statusCode|| 500).json({
    success: false,
    error: err.message ||"server error",
  });
};

module.exports = errorHandler;
