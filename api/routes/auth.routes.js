const express = require("express");
const {
    registerUser,
    loginUser,
    sendOTP,
    verifyOTP,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/sendOTP/:email", sendOTP);
router.post("/forgotpassword/verify-otp/:email/:otp", verifyOTP);

module.exports = router;
