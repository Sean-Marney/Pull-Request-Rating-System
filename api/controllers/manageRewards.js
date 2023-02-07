import Reward from "../models/Reward.js";

// CRUD methods for rewards

// Get all rewards
export const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.status(200).json(rewards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a reward by name
export const getRewardByName = async (req, res) => {
  try {
    const reward = await Reward.findOne({ rewardName: req.params.name });
    if (!reward) {
      return res
        .status(404)
        .json({ message: "Reward with that name was not found" });
    }

    res.status(200).json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rewards, sorted by stars required
export const getRewardSortedByStars = async (req, res) => {
  try {
    // TODO - Make method correctly sort by size of number
    const rewards = await Reward.find().sort({ starsRequired: 1 });
    res.status(200).json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a reward
export const createReward = async (req, res) => {
  try {
    const reward = new Reward({
      rewardName: req.body.rewardName,
      starsRequired: req.body.starsRequired,
    });
    await reward.save();

    res.status(201).json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a reward
export const updateReward = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ message: "Reward with that ID not found" });
    }

    reward.rewardName = req.body.rewardName;
    reward.starsRequired = req.body.starsRequired;
    await reward.save();

    res.status(200).json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a reward
export const deleteReward = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ message: "Reward with that ID not found" });
    }

    await reward.remove();

    res.status(200).json({ message: "Reward deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getRewards,
  getRewardByName,
  getRewardSortedByStars,
  createReward,
  updateReward,
  deleteReward,
};
