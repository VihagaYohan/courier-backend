const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const PackageTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add package type name"],
    trim: true,
    maxlength: [50, "Package type name can not be more than 50 characters"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// input validation
const packageValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
  });
  return schema.validate(data);
};

const PackageType = mongoose.model("PackageType", PackageTypeSchema);

module.exports = {
  PackageType,
  PackageTypeSchema,
  packageValidation,
};
