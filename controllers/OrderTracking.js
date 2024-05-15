const { OrderTracking } = require("../models/OrderTracking");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");

// @desc    Add order location
// @route   GET /api/v1/packageTypes
// @access  Private
exports.updateOrderLocation = asyncHandler(async (req, res, next) => {
  let orderLocation = await OrderTracking.findOne({
    orderId: req.body.orderId,
  });

  if (orderLocation == null) {
    orderLocation = {
      orderId: req.body.orderId,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    // create new order location record in DB
    const newOrderLocation = await OrderTracking.create(req.body);
    return res
      .status(200)
      .json(
        new SuccessResponse(true, "Order location added", 200, newOrderLocation)
      );
  } else {
    const order = await OrderTracking.findByIdAndUpdate(orderLocation._id, {
      _id: orderLocation._id,
      orderId: orderLocation.orderId,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    return res
      .status(200)
      .json(
        new SuccessResponse(true, "Order location has been updated", 200, order)
      );
  }
});
