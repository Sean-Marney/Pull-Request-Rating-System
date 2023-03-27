const express = require("express");
const {
  getNumberOfPendingPullRequests,
  getNumberOfClaimedRewards,
} = require("../controllers/managerDashboard.controller");

const router = express.Router();

router.get(
  "/dashboard/get-number-of-pending-pull-requests",
  getNumberOfPendingPullRequests
);
router.get(
  "/dashboard/get-number-of-claimed-rewards",
  getNumberOfClaimedRewards
);

module.exports = router;
