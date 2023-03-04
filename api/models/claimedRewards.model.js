const mongoose = require("mongoose");

const ClaimedRewardsSchema = new mongoose.Schema({
  reward_id: {
    type: String,
    required: true,
  },
  reward_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  date_claimed: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const ClaimedRewards = mongoose.model("ClaimedRewards", ClaimedRewardsSchema);
module.exports = ClaimedRewards;
