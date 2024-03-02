const { User, validationUser } = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");

// @desc        Register a new user
// @route       POST /api/v1/auth/
// @access      Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  // input validation
  const { error } = validationUser(req.body);
  if (error) {
    next(new ErrorResponse(error.message, 400));
    return;
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
