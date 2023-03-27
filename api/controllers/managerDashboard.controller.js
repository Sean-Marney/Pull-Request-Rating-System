const PullRequest = require("../models/pullRequest.model");
const ClaimedRewards = require("../models/claimedRewards.model");

// Gets the number of pull requests that are pending (i.e. not been rated yet)
const getNumberOfPendingPullRequests = async (req, res) => {
  try {
    // Count the number of documents where rating_complete is false
    const pendingPullRequestCount = await PullRequest.countDocuments({
      rating_complete: false,
    });

    res.status(200).json(pendingPullRequestCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNumberOfClaimedRewards = async (req, res) => {
  try {
    const claimedRewardsCount = await ClaimedRewards.countDocuments({
      archived: false,
    });

    res.status(200).json(claimedRewardsCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNumberOfPendingPullRequests, getNumberOfClaimedRewards };
