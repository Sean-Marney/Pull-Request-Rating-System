const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    // Extract the name and email values from the request body and convert to lowercase
    const name = req.body.name.toLowerCase();
    const email = req.body.email.toLowerCase();

    // Check if a user with the same name or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
        // If a user with the same name or email exists, return a 401 response with an error message
        return res
            .status(401)
            .json({ message: "Name or email has already been taken" });
    }

    // Hash the password with bcrypt and create a new User document with the name, email, and hashed password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ name, email, password: hashedPassword, hasRole: "Manager" });

    // Save the new user to the database and return a success response
    await newUser.save();
    res.json({ message: "Success" , isRegistered:true});
};

const loginUser = async (req, res) => {
    // Extract email and password values from the request body
    const { email, password } = req.body;

    try {
        // Look up the user in the database using the provided email (convert to lowercase to ensure consistency)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user){
            // If user is not found, return a 401 response with an error message
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        

        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the passwords don't match, return a 401 response with an error message
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // Generate a JSON Web Token (JWT) with the user's ID and email and sign it with a secret key
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.PASSPORTSECRET,
            { expiresIn: 86400 }
        );

        // Return a success response with the JWT included as a Bearer token
        res.json({ message: "Success", token: `Bearer ${token}`, hasRole: user.hasRole});
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
