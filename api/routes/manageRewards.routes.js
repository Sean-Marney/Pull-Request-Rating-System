const express = require("express");
const {
  createReward,
  deleteReward,
  getRewards,
  getRewardSortedByStars,
  updateReward,
  getRewardsById,
} = require("../controllers/manageRewards.controller");

const router = express.Router();

// CRUD routes for /manage/rewards
router.get("/", getRewards);
router.get("/:id", getRewardsById);
router.get("/sort/byStars", getRewardSortedByStars);
router.post("/create", createReward);
router.patch("/update/:id", updateReward);
router.delete("/delete/:id", deleteReward);

module.exports = router;
