const express = require("express");
const {
  getNumberOfPendingPullRequests,
  getNumberOfClaimedRewards,
  getClaimedRewards,
  getTopDevelopers,
  getAllDevelopers,
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
router.get("/dashboard/get-all-developers", getAllDevelopers);

module.exports = router;
