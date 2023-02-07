// server.js
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import manageRewardsRoute from "./routes/manageRewards.js";

dotenv.config();
const app = express();

// connect database
connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// routes
app.use("/management/rewards", manageRewardsRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
