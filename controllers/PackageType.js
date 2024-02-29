const { PackageType } = require("../models/PackageType");

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
