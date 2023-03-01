const PullRequest = require("../models/PullRequest");


const getPullRequestsForUser = async (req, res) => {
  try {
    const pullRequests = await PullRequest.find();
    res.status(200).json(pullRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
    getPullRequestsForUser,
};
