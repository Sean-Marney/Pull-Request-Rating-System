// server.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const rewardsRoute = require("./routes/rewards.routes");
const pullRequestsRoute = require("./routes/pullRequests");

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

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'tinmsipa2@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});





// connect database
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => res.send("Server up and running"));
app.use("/pullrequests", pullRequestsRoute);

// routes
app.use("/management/rewards", rewardsRoute);
app.use("/rewards", rewardsRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

module.exports = app;
