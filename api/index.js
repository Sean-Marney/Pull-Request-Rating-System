// server.js
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const express = require("express");
require("dotenv").config();
const rewardsRoute = require("./routes/rewards.routes");
const historyRoute = require("./routes/history.routes");

const app = express();

// connect database
connectDB();

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json({ extended: false }));

// routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(cors());

app.get("/", (req, res) => res.send("Server up and running"));
app.use("/pullrequests", historyRoute);

// routes
app.use("/management/rewards", rewardsRoute);
app.use("/rewards", rewardsRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
