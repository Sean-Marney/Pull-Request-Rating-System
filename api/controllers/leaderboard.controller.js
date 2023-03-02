const User = require("../models/user.model");

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ stars: -1 }).limit(10).select("name stars");
        res.json(leaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
