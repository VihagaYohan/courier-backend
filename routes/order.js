const express = require("express");
const {
  addOrder,
  getAllOrders,
  getAllOrdersForUser,
} = require("../controllers/Order");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(protect, getAllOrders).post(protect, addOrder);

router.route("/user/:id").get(protect, getAllOrdersForUser);

module.exports = router;
