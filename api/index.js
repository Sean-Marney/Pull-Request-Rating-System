// server.js
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
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
const developerDashboardRoute = require("./routes/developerDashboard.routes");
const manageQuestions = require("./routes/question.routes");
const managerHelpRoute = require("./routes/ManagerHelp.routes");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");


app.use(bodyParser.json());

// connect database
connectDB();

app.use(
  cors({
    origin: ["http://pullmaster.io-react.s3-website.eu-north-1.amazonaws.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// routes
app.use("/", authRoutes);
app.use("/dashboard", developerDashboardRoute);
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
app.use("/management/questions", manageQuestions);
app.use("/questions", manageQuestions);
app.post("/management/ManagerHelp", managerHelpRoute);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
