const mongoose = require("mongoose");
const Joi = require("joi");

const orderTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// input validation
const orderTypeValidation = (status) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(status);
};

const OrderType = new mongoose.model("OrderType", orderTypeSchema);

module.exports = {
  orderTypeSchema: orderTypeSchema,
  orderTypeValidation,
  OrderType,
};
