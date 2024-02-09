const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");

// load env vars
dotenv.config({ path: "./config/config.env" });

// middleware
const errorHandler = require("./middleware/errorHandler");

// import DB connection
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

// connect to database
connectDB();

// logging for dev enviontment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// route files

// error handler middleware
app.use(errorHandler);

// controllers

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// handle unhandled exceptions
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
