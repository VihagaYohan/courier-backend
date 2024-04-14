const express = require("express");
const {
  addOrder,
  getAllOrders,
  getAllOrdersForUser,
  getOrderStatusUpdate,
} = require("../controllers/Order");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(protect, getAllOrders).post(protect, addOrder);

router.route("/user/:id").get(protect, getAllOrdersForUser);

router.route("/status/:id").get(protect, getOrderStatusUpdate);

module.exports = router;
