// server.js
require("dotenv").config(); 
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const manageFaqs = require("./routes/manageFaqs.js");
const rewardsRoute = require("./routes/rewards.routes");
const pullRequestsRoute = require("./routes/pullRequests");

const app = express();

// connect database
connectDB(); 

app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => res.send("Server up and running"));
app.use("/pullrequests", pullRequestsRoute);

// routes
app.use("/management/rewards", rewardsRoute);
app.use("/management/manageFaqs", manageFaqs);
app.use("/faqs", manageFaqs);
app.use("/rewards", rewardsRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
