const { Sender, senderValidation } = require("../models/Sender");
const { Receiver, receiverValidation } = require("../models/Receiver");
const { Order, orderValidation } = require("../models/Order");
const CourierStates = require("../models/CourierStates");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const OrderStatus = require("../constants/orderStates");

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
  if (error) {
    next(new ErrorResponse("Please provide valid details", 400));
  }

  // check for the order placed status
  let statusList = await CourierStates.find({ name: OrderStatus.orderPlaced });
  console.log(statusList);

  // spread body to order body
  const orderObj = { ...req.body };
  // assign default status id
  orderObj.statusId = statusList[0]?._id;
  console.log(orderObj);

  let order = await Order.create(orderObj);

  return res.status(200).json({
    success: true,
    data: order,
  });
});
