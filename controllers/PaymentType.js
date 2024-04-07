const asyncHandler = require("../middleware/asyncHandler");
const { PaymentType } = require("../models/PaymentType");
const SuccessResponse = require("../utils/SuccessResponse");
const ErrResponse = require("../utils/ErrorResponse");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    Get all payment types
// @routes  GET /api/v1/paymentTypes
// @access  Public
exports.getPaymentTypes = asyncHandler(async (req, res, next) => {
  const paymentTypes = await PaymentType.find();
  if (paymentTypes.length == 0) {
    console.log(1);
    return next(new ErrorResponse("No payment type found", 404));
  } else {
    console.log(2);
    return res
      .status(200)
      .json(new SuccessResponse(true, "Payment types", 200, paymentTypes));
  }
});

// @desc    Add payment type
// @route   POST /api/v1/paymentType
// @access  Public
exports.addPaymentType = async (req, res, next) => {
  const payment = await PaymentType.create(req.body);

  res
    .status(200)
    .json(new SuccessResponse(true, "Payment type added", 201, payment));
};
