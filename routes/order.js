const express = require("express");
const { addOrder, getAllOrders } = require("../controllers/Order");

const router = express.Router();

router.route("/").get(getAllOrders).post(addOrder);

module.exports = router;
