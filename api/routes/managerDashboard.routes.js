const express = require("express");
const {
  getNumberOfPendingPullRequests,
  getNumberOfClaimedRewards,
  getClaimedRewards,
  getTopDevelopers,
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
router.get("/dashboard/get-claimed-rewards", getClaimedRewards);
router.get("/dashboard/get-top-developers", getTopDevelopers);

module.exports = router;
