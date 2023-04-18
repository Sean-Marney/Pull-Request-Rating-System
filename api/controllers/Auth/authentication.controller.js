const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../Auth/emailUtils");

const registerUser = async (req, res) => {
    try {
        // Extract the name and email values from the request body and convert to lowercase
        const name = req.body.name.toLowerCase();
        const email = req.body.email.toLowerCase();

        // Check if a user with the same name or email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If a user with the same name or email exists, return a 409 response with an error message
            return res
                .status(409)
                .json({ message: "Email already exists in the database" });
        }

        // Hash the password with bcrypt and create a new User document with the name, email, and hashed password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            hasRole: "Manager",
        });

        // Save the new user to the database and return a success response
        await newUser.save();

        const mailOptions = {
            from: "team7largeteamproject@gmail.com",
            to: email,
            subject: "PullMaster.io Onboarding Confirmation",
            html: `<div style="background-color: white; padding: 10px;">
            <p style="font-family: Arial; font-size: 16px;">Hi ${name},</p>
            <p style="font-family: Arial; font-size: 16px;">Wecome to PullMaster.io</p>
            <p style="font-family: Arial; font-size: 16px;">Thank you for registering with PullMaster.io! We're excited to have you on board.</p>
            <p style="font-family: Arial; font-size: 16px;">Best regards,</p>
            <p style="font-family: Arial; font-size: 16px;">The PullMaster.io Team</p>
            </div>
            <div style="background-color: #1b2437; color: white; text-align: center; padding: 10px;">
            <h1 style="font-family: Bahnschrift; margin: 0;">PullMaster.io</h1>
            </div>`,
        };
        const emailSent = await sendEmail(mailOptions);

        if (emailSent) {
            console.log(`Email successfully send to ${email}`);
            res.status(200).json({
                success: true,
                isRegistered: true,
                message: "Email sent successfully",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while sending the Email",
        });
    }
};

const loginUser = async (req, res) => {
    // Extract email and password values from the request body
    const { email, password } = req.body;

    try {
        // Look up the user in the database using the provided email (convert to lowercase to ensure consistency)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // If user is not found, return a 401 response with an error message
            return res
                .status(401)
                .json({ message: "User not found with the entered email" });
        }

        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the passwords don't match, return a 401 response with an error message
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        // Generate a JSON Web Token (JWT) with the user's ID and email and sign it with a secret key
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.PASSPORTSECRET,
            { expiresIn: 86400 }
        );

        // Return a success response with the JWT included as a Bearer token
        res.json({
            message: "Success",
            token: `Bearer ${token}`,
            hasRole: user.hasRole,
        });
    } catch (error) {
        // If there is an error, log it to the console and return a 500 response with an error message
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};