const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

const app = express();
// app.use(cors()); // enable CORS for front-end communication
const server = http.createServer(app);
// const io = socketio(server);
const io = require("socket.io")(server, { cors: { origin: "*" } });

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// route files
const courierTypes = require("./routes/courierTypes");
const packageTypes = require("./routes/packageTypes");
const userRoleTypes = require("./routes/userRoles");
const auth = require("./routes/auth");
const courierStates = require("./routes/courierStatus");
const paymentTypes = require("./routes/paymentType");
const orders = require("./routes/order");
const users = require("./routes/users");

// body pharser
app.use(express.json());
app.use(cors());

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount routers
app.use("/api/v1/courierTypes", courierTypes);
app.use("/api/v1/packageTypes", packageTypes);
app.use("/api/v1/userRoles", userRoleTypes);
app.use("/api/v1/auth", auth);
app.use("/api/v1/courierStates", courierStates);
app.use("/api/v1/paymentTypes", paymentTypes);
app.use("/api/v1/orders", orders);
app.use("/api/v1/users", users);

// error handler middleware
app.use(errorHandler);

// connected clients
var connectedUsers = {};

// run socket
io.on("connection", (socket) => {
  console.log(`${socket.id} has joined`);

  // capture received client side event
  socket.on("orderId", (orderId) => {
    connectedUsers[orderId] = socket;
  });
});

const PORT = process.env.PORT || 5000;

const Server = server.listen(
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
