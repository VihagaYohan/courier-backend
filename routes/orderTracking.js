const express = require("express");
const { updateOrderLocation } = require("../controllers/OrderTracking");
const router = express.Router();

router.route("/").post(updateOrderLocation);

module.exports = router;
