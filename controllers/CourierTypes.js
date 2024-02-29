const CourierType = require("../models/CourierType");

// @desc    Get all courier types
// @route   GET /api/v1/courierTypes
// @access  Public
exports.getAllCourierTypes = async (req, res, next) => {
  const types = await CourierType.find();

  res.status(200).json({
    status: true,
    data: types,
  });
};

// @desc    Add courier type
// @route   POST /api/v1/courierTypes
// @access  Public
exports.addCourierType = async (req, res, next) => {
  const type = await CourierType.create(req.body);

  res.status(201).json({
    status: true,
    data: type,
  });
};

// @desc  Update courier type
// @route PUT /api/v1/courierTypes
// @access Public
exports.updateCourierType = async (req, res, next) => {
  const type = await CourierType.findByIdAndUpdate(req.param.id, req.body);

  res.status(301).json({
    status: true,
    data: type,
  });
};

// @desc    Delete courier type
// @route   DLETE /api/v1/courierTypes
// @access  Public
exports.deleteCourierType = async (req, res, next) => {
  const type = await CourierType.findByIdAndDelete(req.param.id);

  res.status(200).json({
    state: true,
    data: type,
  });
};
