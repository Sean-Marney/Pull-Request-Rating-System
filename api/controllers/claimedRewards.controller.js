const ClaimedRewards = require("../models/claimedRewards.model");

// Gets all claimed rewards
const getClaimedRewards = async (req, res) => {
  try {
    const claimedRewards = await ClaimedRewards.find();
    res.status(200).json(claimedRewards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getArchivedRewards = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// This method is called when the user clicks the "Claim Reward" button
const saveClaimedReward = async (req, res) => {
  try {
    const {
      rewardId,
      rewardName,
      userId,
      userEmail,
      dateClaimed,
      dateArchived,
    } = req.body;
    const claimedReward = new ClaimedRewards({
      reward_id: rewardId,
      reward_name: rewardName,
      user_id: userId,
      user_email: userEmail,
      date_claimed: dateClaimed,
      date_archived: dateArchived,
    });
    await claimedReward.save();
    res.status(201).json(claimedReward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This method sets the claimed reward to be archived when user clicks the "Archive" button
const updateArchiveStatus = async (req, res) => {
  try {
    const claimedReward = await ClaimedRewards.findById(req.params.id);
    if (!claimedReward) {
      return res.status(404).json({ message: "Reward with that ID not found" });
    }

    claimedReward.archived = true;
    await claimedReward.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClaimedRewards,
  getArchivedRewards,
  saveClaimedReward,
  updateArchiveStatus,
};