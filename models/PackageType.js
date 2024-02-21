const mongoose = require("mongoose");
const Joi = require("joi");

const packageSchema = mongoose.Schema({
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
const packageValidation = (status) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(status);
};

const PackageSchema = new mongoose.model("PackageSchema", packageSchema);

module.exports = {
  PackageSchema: packageSchema,
  packageValidation,
  packageSchema,
};
