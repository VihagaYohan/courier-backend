const errorHandler = (error, req, res, next) => {
  // log to console for the dev
  console.log(error.stack.red);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal server error",
  });
};

module.exports = errorHandler;
