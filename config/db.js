const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.createConnection(process.env.MONGO_URI);
  console.log(`MongDB connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
