const express = require("express");
const {
  getUsersLatestPullRequest,
} = require("../controllers/developerDashboard.controller");

const router = express.Router();

router.get("/recent-pull-request/:userId", getUsersLatestPullRequest);

module.exports = router;
