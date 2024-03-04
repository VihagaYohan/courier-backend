const express = require("express");
const {
  getAllCourierStates,
  createCourierState,
} = require("../controllers/CourierStates");
const router = express.Router();

router.route("/").get(getAllCourierStates).post(createCourierState);

module.exports = router;
