const { PaymentType } = require("../models/PaymentType");
const SuccessResponse = require("../utils/SuccessResponse");

// @desc    Add payment type
// @route   POST /api/v1/paymentType
// @access  Public
exports.addPaymentType = async (req, res, next) => {
  const payment = await PaymentType.create(req.body);

  res
    .status(200)
    .json(new SuccessResponse(true, "Payment type added", 201, payment));
};
