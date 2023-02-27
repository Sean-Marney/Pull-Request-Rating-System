const PullRequest = require("../models/pullRequest.model");

// Reads the pull request for a user
// Takes in the id as a parameter and then returns the pull requests
const getPullRequestsForUser = async (req, res) => {
  try {
    const  parameter  = req.params;
    var sortByDate = { date: -1 };
    const pullRequests = await PullRequest.find(  { user_id: parameter.id} ).sort(sortByDate);
    res.status(200).json(pullRequests);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Update rating
const updateRatingForPullRequest = async (req, res) => {
    try {
        const pullRequest = await PullRequest.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ratings: req.body.rating,
                },
            }
        );

        if (!pullRequest) {
            return res
                .status(404)
                .json({ message: "Pull request with that ID not found" });
        }
        res.status(200).json(pullRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getPullRequestsForUser,
    updateRatingForPullRequest,
};
