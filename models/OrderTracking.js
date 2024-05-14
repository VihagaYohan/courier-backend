const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const orderTrackingSchema = mongoose.Schema({
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

const OrderTracking = new mongoose.model("OrderTracking", OrderTracking);

module.exports = {
  OrderTracking,
  orderTrackingSchema,
};
