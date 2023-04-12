const express = require("express");
const {
    registerUser,
    loginUser,
} = require("../controllers/Auth/authentication.controller");
const {
    sendOTP,
    verifyOTP,
} = require("../controllers/Auth/forgotPassword.controller");
const router = express.Router();
// const loginLmiter = require("../middleware/loginLimiter")

router.post("/register", registerUser);
// router.post("/login", loginLmiter, loginUser);
router.post("/login", loginUser);
router.get("/sendOTP/:email", sendOTP);
router.post("/forgotpassword/verify-otp/:email/:otp", verifyOTP);

module.exports = router;
