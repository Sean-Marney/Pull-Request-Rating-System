const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../controllers/Auth/emailUtils");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get all users
const getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({
            hasRole: req.params.role,
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that ID was not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by email
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that email was not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a user
// Create a user
const createUser = async (req, res) => {
    const email = req.body.email.toLowerCase();
    try {
        const user = new User({
            name: req.body.name,
            email,
            password: await bcrypt.hash(req.body.password, 10),
            hasRole: "Developer",
            git_username: req.body.git_username,
        });
        await user.save();

        const mailOptions = {
            from: "team7largeteamproject@gmail.com",
            to: email,
            subject: "PullMaster.io Onboarding Confirmation",
            html: `<div style="background-color: white; padding: 10px;">
            <p style="font-family: Arial; font-size: 16px;">Hi,</p>
            <p style="font-family: Arial; font-size: 16px;">Wecome to PullMaster.io</p>
            <p style="font-family: Arial; font-size: 16px;">You have been onboarded on PullMaster.io! We're excited to have you on board.</p>
            <p style="font-family: Arial; font-size: 16px;">Best regards,</p>
            <p style="font-family: Arial; font-size: 16px;">The PullMaster.io Team</p>
            </div>
            <div style="background-color: #1b2437; color: white; text-align: center; padding: 10px;">
            <h1 style="font-family: Bahnschrift; margin: 0;">PullMaster.io</h1>
            </div>`,
        };
        await sendEmail(mailOptions);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that ID not found" });
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.stars = req.body.stars;
        user.totalStarsEarned = req.body.totalStarsEarned;
        user.git_username = req.body.git_username;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that ID not found" });
        }

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a user by email
const updateUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ e: req.params.email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that email was not found" });
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.bio = req.body.bio;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update password
const updateUsersPasswordByEmail = async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();
        const user = await User.findOne({ email });
        // const user = await User.findOne({ e: req.params.email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that email was not found" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user by email
const deleteUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with that email not found" });
        }

        await user.remove();

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUsersByRole,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    updateUserByEmail,
    updateUsersPasswordByEmail,
    deleteUserByEmail,
};
