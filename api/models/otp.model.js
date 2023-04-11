const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true },
    otp: { 
        type: String, 
        required: true },
    created_at: { 
        type: Date, 
        default: Date.now, 
        expires: 300 }, // OTP expires after 5 minutes
});

const Otp = mongoose.model("Otp", OtpSchema);
module.exports = Otp;
