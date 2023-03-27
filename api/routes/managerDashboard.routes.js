const express = require("express");
const {
  getNumberOfPendingPullRequests,
} = require("../controllers/managerDashboard.controller");

const router = express.Router();

router.get(
  "/dashboard/get-number-of-pending-pull-requests",
  getNumberOfPendingPullRequests
);

module.exports = router;
