const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
  rewardName: {
    type: String,
    required: true,
  },
  starsRequired: {
    type: Number,
    required: true,
  },
});

const Reward = mongoose.model("Reward", RewardSchema);
module.exports = Reward;
