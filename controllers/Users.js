const { User } = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");
const asyncHandler = require("../middleware/asyncHandler");

// @desc        Get all users
// @route       GET /api/v1/users
// @access      Public
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  return res
    .status(200)
    .json(new SuccessResponse(true, "Fetch all users", 200, users));
});

// @desc        Delete a user
// @route       Delete /api/v1/users/:id
// @access      Public
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json(new SuccessResponse(true, "User deleted", 200, ""));
});
