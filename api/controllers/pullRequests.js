const PullRequest = require("../models/PullRequest");

// Reads the pull request for a user
// Takes in the id as a parameter and then returns the pull requests
const getPullRequestsForUser = async (req, res) => {
  try {
    const  parameter  = req.params;
    var sortByDate = { date: -1 };
    const pullRequests = await PullRequest.find(  { user_id: parameter.id} ).sort(sortByDate);
    res.status(200).json(pullRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
    getPullRequestsForUser,
    getPullRequest
};
