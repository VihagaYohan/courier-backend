const { PackageType } = require("../models/PackageType");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");

// @desc    Get all package types
// @route   GET /api/v1/packageTypes
// @access  Public
exports.getAllPackageTypes = async (req, res, next) => {
  const types = await PackageType.find();

  res.status(200).json({
    status: true,
    data: types,
  });
};

// @desc    Get package type by id
// @route   GET /api/v1/packageTypes/id
// @access  Public
exports.getPackageTypeById = asyncHandler(async (req, res, next) => {
  const packageType = await PackageType.findById(req.params.id);
  if (!packageType) {
    return next(new ErrorResponse("Unable to locate package type", 404));
  }
  return res
    .status(200)
    .json(new SuccessResponse(true, "Package type found", 200, packageType));
});

// @desc    Add a new package type
// @route   POST /api/v1/packageTypes
// @access  Public
exports.addPackageType = async (req, res, next) => {
  const type = await PackageType.create(req.body);

  res.status(200).json({
    status: true,
    data: type,
  });
};

// @desc    Update a package type
// @route   PUT /api/v1/packageTypes
// @access  Public
exports.updatePackageType = async (req, res, next) => {
  const type = await PackageType.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: true,
    data: type,
  });
};

// @desc    Delete a package type
// @route   DELETE /api/v1/packageTypes
// @access  Public
exports.deletePackageType = async (req, res, next) => {
  const type = await PackageType.findByIdAndDelete(req.params.id, req.body);

  res.status(200).json({
    status: true,
    data: type,
  });
};
