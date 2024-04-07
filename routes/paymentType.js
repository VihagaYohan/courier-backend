const express = require("express");
const {
  addPaymentType,
  getPaymentTypes,
} = require("../controllers/PaymentType");

const router = express.Router();

router.route("/").get(getPaymentTypes).post(addPaymentType);

module.exports = router;
