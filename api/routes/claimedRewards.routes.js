const express = require("express");

const {
  getClaimedRewards,
  getArchivedRewards,
  saveClaimedReward,
  updateArchiveStatus,
} = require("../controllers/claimedRewards.controller");

const router = express.Router();

router.get("/get", getClaimedRewards);
router.get("/archived", getArchivedRewards);
router.post("/save", saveClaimedReward);
router.patch("/update/:id", updateArchiveStatus);

module.exports = router;
