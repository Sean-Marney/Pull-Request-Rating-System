const ClaimedRewards = require("../models/claimedRewards.model");

// This method is called when the user clicks the "Claim Reward" button
const saveClaimedReward = async (req, res) => {
  try {
    const { rewardId, rewardName, userId, userEmail, dateClaimed } = req.body;
    const claimedReward = new ClaimedRewards({
      reward_id: rewardId,
      reward_name: rewardName,
      user_id: userId,
      user_email: userEmail,
      date_claimed: dateClaimed,
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveClaimedReward,
  getClaimedRewards,
};
