const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      minlength: [2, "Name should be longer 2 characters"],
      maxlength: [50, "Name should not be longer than 50 characters"],
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
    password: {
      type: String,
      trim: true,
      minlength: [4, "Password should be longer than 4 characters"],
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number"],
      trim: true,
      maxlength: [10, "Phone number shoud not be longer than 10 characters"],
      unieq: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRole",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    methods: {
      // sign JWT and return
      getSignedJwtToken() {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
      },
      // compare the provided password with hashed password in database
      async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      },
    },
  }
);

// create user model
const User = mongoose.model("User", userSchema);

// encrypt password using bycrypt
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// validation for user model
const validationUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    role: Joi.string().required(),
    password: Joi.string().required().min(4),
    phoneNumber: Joi.string().required().max(10),
  });

  return schema.validate(user);
};

// validation for user login
const validationLogin = (payload) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().required(),
  });
  return schema.validate(payload);
};

module.exports = {
  User,
  userSchema,
  validationUser,
  validationLogin,
};
