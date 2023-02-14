const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/register", async (req, res) => {
    console.log(req);
    const user = req.body;

    const takenName = await User.findOne({
        name: user.name.toLowerCase(),
    });
    const takenEmail = await User.findOne({ email: user.email.toLowerCase() });

    if (takenName || takenEmail) {
        return res.status(401).send({
            message: "Username or email has already been taken",
        });
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);
    }

    const dbUser = new User({
        name: user.name.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password,
    });

    dbUser.save();
    return res.json({ message: "Success" });
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
            bcrypt.compare(userLoggingIn.password, dbUser.password);
        }
    );
});

module.exports = router;
