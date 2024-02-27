const express = require("express");
const {
  getAllCourierTypes,
  addCourierType,
  updateCourierType,
  deleteCourierType,
} = require("../controllers/CourierTypes");

const router = express.Router();

router.route("/").get(getAllCourierTypes).post(addCourierType);

router.route("/:id").put(updateCourierType).delete(deleteCourierType);

module.exports = router;
