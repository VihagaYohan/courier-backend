const mongoose = require("mongoose");

const CourierTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add courier type"],
    trim: true,
    maxlength: [50, "Courier type name can not be more than 50 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CourierType", CourierTypeSchema);
