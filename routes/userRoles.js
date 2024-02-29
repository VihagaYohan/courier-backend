const express = require("express");
const { addNewUserRole } = require("../controllers/UserRoleTypes");

const router = express.Router();

router.route("/").post(addNewUserRole);

module.exports = router;
