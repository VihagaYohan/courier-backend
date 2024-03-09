const mongoose = require("mongoose");
const Joi = require("joi");
const geocoder = require("../utils/geoCoder");
Joi.objectId = require("joi-objectid")(Joi);

const receiverSchema = new mongoose.Schema({
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

// geo-code & create location field
receiverSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formatedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipcode: loc[0].zipcode,
    country: loc[0].country,
  };
});

// input validation
const receiverValidation = (data) => {
  const schema = Joi.objectId({
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
