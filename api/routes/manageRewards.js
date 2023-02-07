import express from "express";
import {
  createReward,
  deleteReward,
  getRewards,
  updateReward,
} from "../controllers/manageRewards.js";

const router = express.Router();

// CRUD routes for /manage/rewards
router.get("/", getRewards);
router.post("/create", createReward);
router.patch("/update/:id", updateReward);
router.delete("/delete/:id", deleteReward);

export default router;
