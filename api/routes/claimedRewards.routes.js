const express = require("express");

const {
  getClaimedRewards,
  saveClaimedReward,
  updateArchiveStatus,
} = require("../controllers/claimedRewards.controller");

const router = express.Router();

router.get("/get", getClaimedRewards);
router.get("/archived", getClaimedRewards);
router.post("/save", saveClaimedReward);
router.patch("/update/:id", updateArchiveStatus);

module.exports = router;
