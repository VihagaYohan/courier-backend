const { Sender, senderValidation } = require("../models/Sender");
const { Receiver, receiverValidation } = require("../models/Receiver");
const { Order, orderValidation } = require("../models/Order");
const CourierStates = require("../models/CourierStates");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");
const OrderStatus = require("../constants/orderStates");

// @desc        Get all orders
// @route       GET /api/v1/orders
// @access      Private
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  if (orders.length == 0) {
    next(new ErrorResponse("There are no orders at the moment", 404));
  } else {
    return res
      .status(200)
      .json(
        new SuccessResponse(true, "Fetched all courier orders", 200, orders)
      );
  }
});

// @desc        Get all orders for a specific user
// @route       GET /api/v1/orders/user/id
// @access      Private
exports.getAllOrdersForUser = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ "senderDetails.senderId": req.params.id });
  if (orders.length == 0) {
    next(new ErrorResponse("There are no orders at the moment", 404));
  } else {
    return res
      .status(200)
      .json(
        new SuccessResponse(
          true,
          `Fetched all courier orders for ${req.params.id}`,
          200,
          orders
        )
      );
  }
});

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
  } else {
    // check for the order placed status
    let statusList = await CourierStates.find({
      name: OrderStatus.orderPlaced,
    });

    // spread body to order body
    const orderObj = { ...req.body };
    // assign default status id
    orderObj.statusId = statusList[0]?._id;

    let order = await Order.create(orderObj);

    return res.status(200).json({
      success: true,
      data: order,
    });
  }
});
