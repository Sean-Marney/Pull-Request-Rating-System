import express from "express";
import {
  createReward,
  deleteReward,
  // getRewardByName,
  getRewards,
  getRewardSortedByStars,
  updateReward,
  getRewardsById,
} from "../controllers/manageRewards.js";

const router = express.Router();

// CRUD routes for /manage/rewards
router.get("/", getRewards);
router.get("/:id", getRewardsById);
router.get("/sort/byStars", getRewardSortedByStars);
router.post("/create", createReward);
router.patch("/update/:id", updateReward);
router.delete("/delete/:id", deleteReward);

export default router;
