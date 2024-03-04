const express = require("express");
const { addPaymentType } = require("../controllers/PaymentType");

const router = express.Router();

router.route("/").post(addPaymentType);

module.exports = router;
