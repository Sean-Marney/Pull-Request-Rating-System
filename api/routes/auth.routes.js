const express = require("express");
const { registerUser, loginUser, refresh } = require("../controllers/auth.controller");
const router = express.Router();
// const loginLmiter = require("../middleware/loginLimiter")

router.post("/register", registerUser);
// router.post("/login", loginLmiter, loginUser);
router.post("/login", loginUser);

module.exports = router;
