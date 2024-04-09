const express = require("express");
const {
  getAllPackageTypes,
  addPackageType,
  updatePackageType,
  deletePackageType,
  getPackageTypeById,
} = require("../controllers/PackageType");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(getAllPackageTypes).post(protect, addPackageType);

router
  .route("/:id")
  .get(getPackageTypeById)
  .put(updatePackageType)
  .delete(protect, deletePackageType);

module.exports = router;
