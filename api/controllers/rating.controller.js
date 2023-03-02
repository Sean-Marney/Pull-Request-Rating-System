const PullRequest = require("../models/pullRequest.model");
const math = require("mathjs");

const createRating = async (req, res) => {
    try {
        // Validate input
        if (!req.body.rating || !req.body.rating_complete) {
            return res
                .status(400)
                .json({ message: "Missing rating input fields" });
        }

        // Calculate overall rating
        const ratings = Object.values(req.body.rating);
        const numRatings = ratings.length;
        if (numRatings === 0) {
            return res.status(400).json({ message: "No ratings provided" });
        }
        const ratingAverage = math.ceil(math.sum(ratings) / numRatings);
        const ratingSum = math.sum(ratings);

        // Update pull request
        const result = await PullRequest.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ratings: {
                        ...req.body.rating,
                        overall: ratingSum,
                        average: ratingAverage,
                    },
                    rating_complete: req.body.rating_complete,
                },
            }
        );

        // Check if pull request was found
        if (result.nModified === 0) {
            return res
                .status(404)
                .json({ message: "Pull request with that ID not found" });
        }

        // Return success response
        res.status(200).json({ message: "Rating updated successfully" });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating rating",
        });
    }
};

module.exports = {
    createRating,
};
