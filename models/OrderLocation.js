const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const orderLocationSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  latitude: {
    type: number,
    required: true,
  },
  longitude: {
    type: number,
    required: true,
  },
});

const OrderLocation = new mongoose.model("OrderLocation", orderLocationSchema);

module.exports = {
  OrderLocation,
  orderLocationSchema,
};
