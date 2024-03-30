const { User, validationUser, validationLogin } = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");

// @desc        Register a new user
// @route       POST /api/v1/auth/register
// @access      Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  // input validation
  const { error } = validationUser(req.body);
  if (error) {
    next(new ErrorResponse(error.message, 400));
    return;
  }

  // check if user email address already exists in database
  let userExits = await User.findOne({ email: req.body.email });
  if (userExits) {
    return next(new ErrorResponse("Email already exists", 400));
  }

  // encrypt password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = await User.create(req.body);
  // create token
  const token = user.getSignedJwtToken();

  return res.status(201).json(
    new SuccessResponse(true, "New user has been registered", 201, {
      user,
      token,
    })
  );
});

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  // input validation
  const { error } = validationLogin(req.body);
  if (error) {
    next(new ErrorResponse("Please provide an email and password", 400));
    return;
  }

  // check for user
  const email = req.body.email;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }

  // compare password
  const isMatch = await user.matchPassword(req.body.password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // create token
  const token = user.getSignedJwtToken();
  res.status(200).json(
    new SuccessResponse(true, "Login successful", 200, {
      user,
      token,
    })
  );
});
