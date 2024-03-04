const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add payment type name"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PaymentType = mongoose.model("PaymentType", paymentSchema);

module.exports = {
  PaymentType,
  paymentSchema,
};
