const express = require("express");

const {
  createReward,
  deleteReward,
  getRewards,
  updateReward,
  getRewardsById,
} = require("../controllers/manageRewards.controller");
const {
  getClaimedRewards,
  saveClaimedReward,
} = require("../controllers/claimedRewards.controller");

const router = express.Router();

router.get("/", getRewards);
router.get("/:id", getRewardsById);
router.post("/create", createReward);
router.patch("/update/:id", updateReward);
router.delete("/delete/:id", deleteReward);

router.get("/claimed", getClaimedRewards);
router.post("/claimed/save", saveClaimedReward);

module.exports = router;
