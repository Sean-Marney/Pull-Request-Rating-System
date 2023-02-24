const ClaimedRewards = require("../models/claimedRewards.model");

// This method is called when the user clicks the "Claim Reward" button
const saveClaimedReward = async (req, res) => {
  try {
    const { rewardId, userId } = req.body;
    const claimedReward = new ClaimedRewards({
      reward_id: rewardId,
      user_id: userId,
    });
    await claimedReward.save();
    res.status(201).json(claimedReward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClaimedRewards = async (req, res) => {
  try {
    const claimedRewards = await ClaimedRewards.find();
    res.status(200).json(claimedRewards);
    console.log(claimedRewards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  saveClaimedReward,
  getClaimedRewards
};
