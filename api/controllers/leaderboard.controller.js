const User = require("../models/user.model");
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({ hasRole: "Developer" })
      .sort({ totalStarsEarned: -1 })
      .select("name totalStarsEarned");
    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
