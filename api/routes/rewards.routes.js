const express = require("express");

const {
  createReward,
  deleteReward,
  getRewards,
  updateReward,
  getRewardsById,
} = require("../controllers/manageRewards.controller");

const router = express.Router();

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.get("/", getRewards);
router.get("/:id", getRewardsById);
router.post("/create", verifyManger, createReward);
router.patch("/update/:id", verifyManger, updateReward);
router.delete("/delete/:id", verifyManger, deleteReward);

module.exports = router;
