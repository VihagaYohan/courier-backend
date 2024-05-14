const { OrderTracking } = require("../models/OrderTracking");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const SuccessResponse = require("../utils/SuccessResponse");

// @desc    Add order location
// @route   GET /api/v1/packageTypes
// @access  Private
exports.updateOrderLocation = asyncHandler(async (req, res, next) => {
  const orderLocation = await OrderTracking.findOne({
    orderId: req.body.orderId,
  });

  orderLocation = {
    ...orderLocation,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  console.log("order location", orderLocation);

  if (!orderLocation) {
    // create new order location record in DB
    const newOrderLocation = await OrderLocation.create(req.body);
    return res
      .status(200)
      .json(
        new SuccessResponse(true, "Order location added", 200, newOrderLocation)
      );
  } else {
    return res
      .status(200)
      .json(
        new SuccessResponse(
          true,
          "Order location has been updated",
          200,
          orderLocation
        )
      );
  }
});

module.exports = {
  updateOrderLocation,
};
