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
    }
    else {
        user.password = await bcrypt.hash(req.body.password, 10);
    }
});

module.exports = router;
