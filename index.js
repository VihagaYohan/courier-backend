const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

const app = express();

// route files
const courierTypes = require("./routes/courierTypes");
const packageTypes = require("./routes/packageTypes");
const userRoleTypes = require("./routes/userRoles");
const auth = require("./routes/auth");

// body pharser
app.use(express.json());

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount routers
app.use("/api/v1/courierTypes", courierTypes);
app.use("/api/v1/packageTypes", packageTypes);
app.use("/api/v1/userRoles", userRoleTypes);
app.use("/api/v1/auth", auth);

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const Server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.underline);
  // close server and exit process
  Server.close(() => process.exit(1));
});
