const mongoose = require("mongoose");
const Joi = require("joi");

const UserRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add user role name"],
    trim: true,
    maxlength: [20, "User role name can not be more than 20 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// input validation
const userRoleValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
  });
  return schema.validate(data);
};

const UserRole = mongoose.model("UserRole", UserRoleSchema);

module.exports = {
  UserRoleSchema,
  UserRole,
  userRoleValidation,
};
