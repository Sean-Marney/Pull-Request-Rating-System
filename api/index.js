// server.js
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
const express = require("express");
require("dotenv").config();
const rewardsRoute = require("./routes/rewards.routes");
const repositoriesRoute = require("./routes/repositories.routes");
const historyRoute = require("./routes/history.routes");
const userRoute = require("./routes/user.routes");
const leaderboardRoute = require("./routes/leaderboard.routes.js");

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
app.use("/pullrequests", historyRoute);

// routes
app.use("/", authRoutes);
app.use("/management/rewards", rewardsRoute);
app.use("/rewards", rewardsRoute);
app.use("/management/repositories", repositoriesRoute);
app.use("/management/users", userRoute);
app.get("/leaderboard", leaderboardRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
