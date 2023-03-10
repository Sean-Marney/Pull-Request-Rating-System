// server.js
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
const express = require("express");
require("dotenv").config();
const rewardsRoute = require("./routes/rewards.routes");
const repositoriesRoute = require("./routes/repositories.routes");
const historyRoute = require("./routes/history.routes");
const userRoute = require("./routes/user.routes");
const emailRouter = require("./routes/ManagerHelp.routes");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");


app.use(bodyParser.json());






//Nodemailer code
//Currently only sending email though postman.
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'tinom101@outlook.com', //dummy email address
        pass: 'templejax12',
    },
});







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
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => res.send("Server up and running"));
app.use("/pullrequests", historyRoute);

// routes
app.use("/", authRoutes);
app.use("/management/rewards", rewardsRoute);
app.use("/rewards", rewardsRoute);
app.use("/management/repositories", repositoriesRoute);
app.use("/management/users", userRoute);

app.post("/management/ManagerHelp", emailRouter);


// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
