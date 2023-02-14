const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/register", async (req, res) => {
    const name = req.body.name.toLowerCase();
    const email = req.body.email.toLowerCase();
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
        return res
            .status(401)
            .json({ message: "Name or email has already been taken" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Success" });
});

router.post("/login", (req, res) => {
    const userLoggingIn = req.body;

    User.findOne({ email: userLoggingIn.email.toLowerCase() }).then(
        (dbUser) => {
            if (!dbUser) {
                return res.status(401).send({
                    message: "Invalid email or password",
                });
            }
            bcrypt
                .compare(userLoggingIn.password, dbUser.password)
                .then((isCorrect) => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            email: dbUser.email,
                        };
                        jwt.sign(
                            payload,
                            process.env.PASSPORTSECRET,
                            { expiresIn: 86400 },
                            (err, token) => {
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token,
                                });
                            }
                        );
                    } else {
                        return res.status(401).send({
                            message: "Invalid email or password",
                        });
                    }
                });
        }
    );
});

module.exports = router;
