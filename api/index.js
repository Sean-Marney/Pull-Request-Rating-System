// server.js
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const manageFaqs = require("./routes/manageFaqs.js");

const app = express();

// connect database
connectDB();


app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));


// routes
app.use("/management/manageFaqs", manageFaqs);


// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});


