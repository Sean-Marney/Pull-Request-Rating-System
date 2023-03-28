const Reward = require("../models/reward.model");

// CRUD methods for rewards

// Get all rewards
const getRewards = async (req, res) => {
  try {
    // const rewards = await Reward.find();
    res.status(200).json("hello");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a reward by ID
const getRewardsById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res
        .status(404)
        .json({ message: "Reward with that ID was not found" });
    }

    res.status(200).json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a reward
const createReward = async (req, res) => {
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
const updateReward = async (req, res) => {
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
const deleteReward = async (req, res) => {
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

module.exports = {
  getRewards,
  getRewardsById,
  createReward,
  updateReward,
  deleteReward,
};
