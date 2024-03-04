const express = require("express");
const { addNewUserRole } = require("../controllers/UserRoleTypes");
const { protect } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").post(protect, addNewUserRole);

module.exports = router;
