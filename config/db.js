const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.createConnection(process.env.MONGO_URI);
  if (conn.readyState == 1) {
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } else {
    console.log(
      `Failed MongoDB connection: ${conn.connection.host}`.red.underline.bold
    );
  }
};

module.exports = connectDB;
