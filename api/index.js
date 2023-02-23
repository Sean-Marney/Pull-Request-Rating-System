// server.js
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const manageFaqs = require("./routes/manageFaqs.js");
const rewardsRoute = require("./routes/rewards.routes");
const repositoriesRoute = require("./routes/repositories.routes");
const historyRoute = require("./routes/history.routes");
const userRoute = require("./routes/user.routes");

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
app.use("/management/manageFaqs", manageFaqs);
app.use("/faqs", manageFaqs);
app.use("/management/repositories", repositoriesRoute);
app.use("/management/users", userRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
