const mongoose = require("mongoose");

const ClaimedRewardsSchema = new mongoose.Schema({
  reward_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const ClaimedRewards = mongoose.model("ClaimedRewards", ClaimedRewardsSchema);
module.exports = ClaimedRewards;
