const CourierStates = require("../models/CourierStates");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");

// @desc    Get all courier states
// @route   GET /api/v1/states
// @access  Public
exports.getAllCourierStates = asyncHandler(async (req, res, next) => {
  const states = await CourierStates.find();

  return res
    .status(200)
    .json(new SuccessResponse(true, "Get all courier states", 200, states));
});

// @desc    Create a new courier status
// @route   GET /api/v1/states
// @access  Public
exports.createCourierState = asyncHandler(async (req, res, next) => {
  const state = await CourierStates.create(req.body);

  return res
    .status(201)
    .json(new SuccessResponse(true, "New courier status created", 201, state));
});
