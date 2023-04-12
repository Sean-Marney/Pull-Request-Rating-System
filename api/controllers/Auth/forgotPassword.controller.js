const User = require("../../models/user.model");
const Otp = require("../../models/otp.model");
const nodemailer = require("nodemailer");
const validator = require("validator");
const {
    oAuth2Client,
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
} = require("../../controllers/Auth/authentication.controller");

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

        // Generate the OTP and save it to the database
        const otp = generateOTP();
        await Otp.create({ email, otp });

        // Send the OTP to the user's email
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: "team7largeteamproject@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token || "",
                accessType: "OFFLINE",
            },
        });

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
            <div style="background-color: black; color: white; text-align: center; padding: 10px;">
            <h1 style="font-family: Bahnschrift; margin: 0;">PullMaster.io</h1>
            </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}: ${otp}`);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
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
