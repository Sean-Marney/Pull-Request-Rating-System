const express = require("express");
const {
    getPullRequestsForUser,
    updateRatingForPullRequest,
} = require("../controllers/pullRequestHistory.controller");

const router = express.Router();

// gets the pull request for a user
router.get("/history/:id", getPullRequestsForUser);
router.put("/update/:id", updateRatingForPullRequest);

module.exports = router;
