const { UserRole, userRoleValidation } = require("../models/UserRoles");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");
const asyncHandler = require("../middleware/asyncHandler");

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
