const PullRequest = require("../models/pullRequest.model");
const math = require("mathjs");

const createRating = async (req, res) => {
    try {
        let overall =
            math.sum(Object.values(req.body.rating)) /
            Object.keys(req.body.rating).length;
        overall = math.ceil(overall);

        const pullRequest = await PullRequest.updateOne(
            { _id: req.params.id }, 
            {
                $set: {
                    ratings: {
                        ...req.body.rating,
                        overall,
                    },
                    rating_complete: req.body.rating_complete,
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
