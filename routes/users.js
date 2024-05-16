const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/Users");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").delete(deleteUser);

module.exports = router;
