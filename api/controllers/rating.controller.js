const PullRequest = require("../models/pullRequest.model");

// Method to set the rating for the pull request 
const createRating = async (req, res) => {
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
    createRating,
};