const User = require("../../models/user.model");
const Otp = require("../../models/otp.model");
const validator = require("validator");
const {sendEmail} = require("../Auth/emailUtils");

// Generate a random 6-digit OTP code
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};

const sendOTP = async (req, res) => {
    try {
        const { email } = req.params;

        // Validate the email address
        if (!email || !validator.isEmail(email)) {
            return res
                .status(400)
                .json({ message: "Please provide a valid email address" });
        }

        // Check if a user exists with the specified email
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that email was not found" });
        }
        const { name } = user;

        // Generate OTP
        const otp = generateOTP();

        // Check if an OTP exists for the user entered email
        const existingOtp = await Otp.findOne({ email });

        // If OTP exists, update it with the latest one send to the email
        if (existingOtp) await Otp.findOneAndUpdate({ email }, { otp: otp });
        // Generate the OTP and save it to the database
        else await Otp.create({ email, otp });

        const mailOptions = {
            from: "team7largeteamproject@gmail.com",
            to: email,
            subject: "PullMaster.io Password Reset",
            html: `<div style="background-color: white; padding: 10px;">
            <p style="font-family: Arial; font-size: 16px;">Hi ${name},</p>
            <p style="font-family: Arial; font-size: 16px;">We received a request to reset the password on your PullMaster Account. Please use the following code to reset your password within 5 minutes: </p>
            <p style="font-family: Arial; font-size: 20px;">${otp}</p>
             <p style="font-family: Arial; font-size: 16px;">Thanks for helping us keep your account secure </p>
            <p style="font-family: Arial; font-size: 16px;">Best regards,</p>
            <p style="font-family: Arial; font-size: 16px;">The PullMaster.io Team</p>
            </div>
            <div style="background-color: #1b2437; color: white; text-align: center; padding: 10px;">
            <h1 style="font-family: Bahnschrift; margin: 0;">PullMaster.io</h1>
            </div>`,
        };

        // Use the sendEmail function from mailUtils to send the email
        const emailSent = await sendEmail(mailOptions);

        if (emailSent) {
            console.log(`OTP sent to ${email}: ${otp}`);
            res.status(200).json({
                success: true,
                message: "OTP sent successfully",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while sending the OTP",
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if the OTP is valid
        const otpRecord = await Otp.findOne({ email, otp });

        if (!otpRecord) {
            console.log("The value of otpRecord is: " + otpRecord);
            return res.status(400).json({
                message:
                    "The number you entered doesn’t match your code. Please try again.",
            });
        }

        // Delete the OTP record from the database
        await otpRecord.remove();

        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while verifying the OTP",
        });
    }
};

module.exports = {
    sendOTP,
    verifyOTP,
};
