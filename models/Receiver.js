const mongoose = require("mongoose");
const joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const receiverSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, "Please enter phone number"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please enter a receiver address"],
    maxlength: [255, "Address can not be more than 255 characters"],
    trim: true,
  },
  location: {
    // GeoJSON point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formatedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  receiverNotes: {
    type: String,
    required: false,
    trim: true,
  },
});

// input validation
const receiverValidation = (data) => {
  const schema = Joi.objectId({
    _id: Joi.objectId().required(),
    name: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    address: Joi.string().max(255).required(),
    receiverNotes: Joi.string().required(),
  });
  return schema.validate(data);
};

const Receiver = mongoose.model("Receiver", receiverSchema);

module.exports = {
  Receiver,
  receiverSchema,
  receiverValidation,
};
