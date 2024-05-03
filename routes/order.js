const express = require("express");
const {
  addOrder,
  getAllOrders,
  getAllOrdersForUser,
  getOrderStatusUpdate,
  getAllOrdersForRider,
  updateOrder,
} = require("../controllers/Order");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router
  .route("/")
  .get(protect, getAllOrders)
  .post(protect, addOrder)
  .put(protect, updateOrder);

router.route("/user/:id").get(protect, getAllOrdersForUser);

router.route("/user/:id/rider").get(protect, getAllOrdersForRider);

router.route("/status/:id").get(protect, getOrderStatusUpdate);

module.exports = router;
