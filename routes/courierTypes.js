const express = require("express");
const {
  getAllCourierTypes,
  addCourierType,
  updateCourierType,
  deleteCourierType,
  getCourierTypeById,
} = require("../controllers/CourierTypes");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(getAllCourierTypes).post(protect, addCourierType);

router
  .route("/:id")
  .get(getCourierTypeById)
  .put(updateCourierType)
  .delete(protect, deleteCourierType);

module.exports = router;
