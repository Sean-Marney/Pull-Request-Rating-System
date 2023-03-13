const express = require("express");
const {
  getUsersLatestPullRequest,
  getUsersClaimedRewards,
} = require("../controllers/developerDashboard.controller");

const router = express.Router();

router.get("/recent-pull-request/:userId", getUsersLatestPullRequest);
router.get("/claimed-rewards/:userId", getUsersClaimedRewards);

module.exports = router;
