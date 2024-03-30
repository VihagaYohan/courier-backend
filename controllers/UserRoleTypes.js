const { UserRole, userRoleValidation } = require("../models/UserRoles");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");
const asyncHandler = require("../middleware/asyncHandler");
const axios = require("axios");
const os = require("os");

// @desc        Get all user roles
// @route       GET /api/v1/userRoles
// @access      Public
exports.getAllUserRoles = asyncHandler(async (req, res, next) => {
  const userRoles = await UserRole.find();
  return res
    .status(200)
    .json(new SuccessResponse(true, "Fetch all user roles", 200, userRoles));
});

// @desc        Get user role by id
// @route       GET / api/v1/userRoles/Id
// @access      Public
exports.getUserRoleById = asyncHandler(async (req, res, next) => {
  const userRole = await UserRole.findById(req.params.id);
  if (userRole) {
    return res.status(200).json(new SuccessResponse(true, "", 200, userRole));
  } else {
    return res
      .status(401)
      .json(
        new ErrorResponse(`User role not found for given ${req.params.id}`, 401)
      );
  }
});

// @desc        Add new user role
// @route       POST /api/v1/userRoles
// @access      Public
exports.addNewUserRole = asyncHandler(async (req, res, next) => {
  // input validation
  const { error } = userRoleValidation(req.body);
  if (error) {
    next(new ErrorResponse(error.message, 400));
    return;
  }

  const role = await UserRole.create(req.body);
  return res
    .status(201)
    .json(new SuccessResponse(true, "New user role has been added", 201, role));
});

// get user role id based on user role name
exports.getUserRoleId = async (userRoleName) => {
  const userRoles = await UserRole.find({ name: userRoleName });
  return userRoles;
};
