const express = require("express");
const {
  getAllPackageTypes,
  addPackageType,
  updatePackageType,
  deletePackageType,
} = require("../controllers/PackageType");

const router = express.Router();

router.route("/").get(getAllPackageTypes).post(addPackageType);

router.route("/:id").put(updatePackageType).delete(deletePackageType);

module.exports = router;
