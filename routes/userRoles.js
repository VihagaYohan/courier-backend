const express = require("express");
const {
  addNewUserRole,
  getAllUserRoles,
  getUserRoleById,
} = require("../controllers/UserRoleTypes");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").post(protect, addNewUserRole).get(protect, getAllUserRoles);

router.route("/:id").get(getUserRoleById);

module.exports = router;
