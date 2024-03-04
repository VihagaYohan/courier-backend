const { removeDoubleQuotations } = require("../utils/Helper");

const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    // log to console for the dev
    // console.log(error.stack);
  }

  // remove quoations from message
  let msg = removeDoubleQuotations(error.message);

  res.status(error.statusCode || 500).json({
    success: false,
    error: msg || "Internal server error",
  });
  next();
};

module.exports = errorHandler;
