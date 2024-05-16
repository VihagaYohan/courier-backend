const express = require("express");
const {
  addOrder,
  getAllOrders,
  getAllOrdersForUser,
  getOrderStatusUpdate,
  getAllOrdersForRider,
  updateOrderStatus,
  getOrderById,
} = require("../controllers/Order");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(protect, getAllOrders).post(protect, addOrder);

router.route("/:id").get(protect, getOrderById);

router.route("/user/:id").get(protect, getAllOrdersForUser);

router.route("/user/:id/rider").get(protect, getAllOrdersForRider);

router
  .route("/status/:id")
  .get(protect, getOrderStatusUpdate)
  .put(protect, updateOrderStatus);

module.exports = router;
