const PullRequest = require("../models/pullRequest.model");
const ClaimedRewards = require("../models/claimedRewards.model");

// Given a userId, this method returns the most recent pull request created by that user
const getUsersLatestPullRequest = async (req, res) => {
  // Get userId from request params - this will be the userId of the currently logged in user (via cookies)
  const { userId } = req.params;

  try {
    // Find a pull request by userId that has the most recent value in the "date" field
    const pullRequest = await PullRequest.findOne({ user_id: userId })
      .sort({ date: -1 })
      .exec();

    res.status(200).json(pullRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersClaimedRewards = async (req, res) => {
  const { userId } = req.params;

  try {
    const claimedRewards = await ClaimedRewards.find({ user_id: userId });

    res.status(200).json(claimedRewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsersLatestPullRequest, getUsersClaimedRewards };
