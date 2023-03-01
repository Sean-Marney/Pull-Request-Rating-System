const express = require("express");
const {getPullRequestsForUser} = require("../controllers/pullRequests");

const router = express.Router();


router.get("/history/:id", getPullRequestsForUser);
module.exports = router;
