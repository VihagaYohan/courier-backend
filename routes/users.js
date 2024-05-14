const express = require("express");
const { getAllUsers } = require("../controllers/Users");

const router = express.Router();

router.route("/").get(getAllUsers);

module.exports = router;
