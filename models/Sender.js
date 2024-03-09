const mongoose = require("mongoose");
const Joi = require("joi");
const geocoder = require("../utils/geoCoder");
Joi.objectId = require("joi-objectid")(Joi);

const senderSchema = new mongoose.Schema({
  senderId: {
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
  email: {
    type: String,
    trim: true,
    required: [true, "Please add an email address"],
    unieq: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email",
    ],
  },
  pickUpDate: {
    type: Date,
    default: new Date(),
    required: [true, "Please enter pick-up date"],
  },
  pickUpTime: {
    type: String,
    required: [true, "Please enter delivery time"],
  },
  address: {
    type: String,
    required: [true, "Please add pick-up address"],
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
  senderNotes: {
    type: String,
    required: false,
    trim: true,
  },
});

// geo-code & create location field
senderSchema.pre("save", async function (next) {
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
const senderValidation = (data) => {
  const schema = Joi.objectId({
    senderId: Joi.objectId().required(),
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    pickUpDate: Joi.date().greater("1-1-1990"),
    pickUpTime: Joi.string().reuqired(),
    mobileNumber: Joi.string().required(),
    address: Joi.string().max(255).required(),
    senderNotes: Joi.string(),
  });
  console.log("sender validation");
  return schema.validate(data);
};

const Sender = mongoose.model("Sender", senderSchema);

module.exports = {
  Sender,
  senderValidation,
  senderSchema,
};
