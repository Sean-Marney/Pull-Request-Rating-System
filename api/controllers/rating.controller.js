const PullRequest = require("../models/pullRequest.model");
const math = require("mathjs");
const User = require("../models/user.model");

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
        // console.log(req.body);

        const pullRequest = await PullRequest.findById(req.params.id);
        if (!pullRequest) {
            return res
                .status(404)
                .json({ message: "Pull request with that ID not found" });
        }

        // Get user who's pull request is being rated
        const user = await User.findById(req.body.user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calculating updatedStarCount and UpdatedTotalStarCount
        const updatedStarCount = user.stars + ratingSum;
        const updatedTotalStarCount = user.totalStarsEarned + ratingSum;
        let newLevel = updateLevel(user.level, updatedTotalStarCount);
        console.log(newLevel);
        // Updating user model fields stars and totalStarsEarned in DB
        await User.updateOne(
            { _id: user._id },
            {
                $set: {
                    stars: updatedStarCount,
                    totalStarsEarned: updatedTotalStarCount,
                    level: newLevel,
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

function updateLevel(level, currentTotal){
    let newLevel = (currentTotal / 20)|0;
    if (newLevel > level && newLevel <= 20){
        level = newLevel;
    }
    return level;
}

module.exports = {
    createRating,
};
