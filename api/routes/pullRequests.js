const express = require("express");
const {getPullRequestsForUser} = require("../controllers/pullRequests");

const router = express.Router();

// gets the pull request for a user
router.get("/history/:id", getPullRequestsForUser);

module.exports = router;
