const express = require("express");

const {
  getClaimedRewards,
  saveClaimedReward,
} = require("../controllers/claimedRewards.controller");

const router = express.Router();

router.get("/get", getClaimedRewards);
router.post("/save", saveClaimedReward);

module.exports = router;
