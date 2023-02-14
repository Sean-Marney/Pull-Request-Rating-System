const User = require("../models/userModel");

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
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the new user to the database and return a success response
    await newUser.save();
    res.json({ message: "Success" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user)
            return res
                .status(401)
                .json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.PASSPORTSECRET,
            { expiresIn: 86400 }
        );

        res.json({ message: "Success", token: `Bearer ${token}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
