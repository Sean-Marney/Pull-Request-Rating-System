const express = require("express");

const {
  getClaimedRewards,
  saveClaimedReward,
  updateArchiveStatus,
} = require("../controllers/claimedRewards.controller");

const router = express.Router();

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.get("/get", verifyManger, getClaimedRewards);
router.get("/archived", verifyManger, getClaimedRewards);
router.post("/save", verifyManger, saveClaimedReward);
router.patch("/update/:id", verifyManger, updateArchiveStatus);

module.exports = router;
