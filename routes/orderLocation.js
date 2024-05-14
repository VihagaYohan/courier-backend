const express = require("express");
const { updateOrderLocation } = require("../controllers/OrderLocation");
const router = express.Router();

router.route("/").post(updateOrderLocation);

module.exports = router;
