const express = require("express");
const { getUsers } = require("../controllers/user.controller");
const verifyJWTToken = require("../middleware/verifyJWT");
const router = express.Router();

router.get("/users", verifyJWTToken, getUsers);

module.exports = router;
