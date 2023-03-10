// server.js
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const express = require("express");
require("dotenv").config();
const manageFaqs = require("./routes/faq.routes");
const rewardsRoute = require("./routes/rewards.routes");
const claimedRewardsRoute = require("./routes/claimedRewards.routes");
const repositoriesRoute = require("./routes/repositories.routes");
const pullRequestHistoryRoute = require("./routes/pullRequestHistory.routes");
const userRoute = require("./routes/user.routes");
const trackerRoute = require("./routes/tracker.routes");
const ratingRoute = require("./routes/rating.routes");
const leaderboardRoute = require("./routes/leaderboard.routes");
const managerDashboardRoute = require("./routes/managerDashboard.routes");
const app = express();

// connect database
connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// routes
app.use("/", authRoutes);
app.use("/management/rewards", rewardsRoute);
app.use("/management/rewards/claimed", claimedRewardsRoute);
app.use("/rewards", rewardsRoute);
app.use("/management/manageFaqs", manageFaqs);
app.use("/faqs", manageFaqs);
app.use("/management/repositories", repositoriesRoute);
app.use("/management/users", userRoute);
app.use("/management/trackers", trackerRoute);
app.use("/pullrequests", pullRequestHistoryRoute);
app.use("/ratings", ratingRoute);
app.get("/management/Leaderboard", leaderboardRoute);
app.get("/requests", managerDashboardRoute);
app.get("/archived-rewards", managerDashboardRoute);
// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
