const { Sender, senderValidation } = require("../models/Sender");
const { Receiver, receiverValidation } = require("../models/Receiver");
const { Order, orderValidation } = require("../models/Order");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc        Add new orders
// @route       POST /api/v1/orders
// @access      Public
exports.addOrder = asyncHandler(async (req, res, next) => {
  const {
    statusId,
    courierTypeId,
    packageTypeId,
    packageSize,
    senderDetails,
    receiverDetails,
    orderTotal,
    paymentType,
  } = req.body;

  // const sender = await Sender.create(senderDetails);
  /* const senderError = senderValidation(senderDetails);
  if (senderError.error) {
    next(new ErrorResponse("Please provide valid sender details", 400));
  } 

  const ReceiverError = receiverValidation(receiverDetails);
  if (ReceiverError.error) {
    next(new ErrorResponse("Please provide valid receiver details", 400));
  }*/

  const { error } = orderValidation(req.body);
  console.log(error);
  if (error) {
    next(new ErrorResponse("Please provide valid details", 400));
  }

  let order = await Order.create(req.body);

  return res.status(200).json({
    success: true,
    data: order,
  });
});
