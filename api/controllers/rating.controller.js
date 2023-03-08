const PullRequest = require("../models/pullRequest.model");
const math = require("mathjs");
const axios = require("axios");
const User = require("../models/user.model");

// This function updates a user's star and totalStarEarned count based on a rating given to one of their pull requests
const getUserByPullRequestRating = async (ratingSum, id) => {
    try {
        // Get rated pull request from the DB
        const pullRequest = await PullRequest.findById(id);
        if (!pullRequest) {
            return res
                .status(404)
                .json({ message: "Pull request with that ID not found" });
        }

        // Get user whose pull request is being rated
        const user = await User.findById(pullRequest.user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calculating updatedStarCount and UpdatedTotalStarCount
        const updatedStarCount = user.stars + ratingSum;
        const updatedTotalStarCount = user.totalStarsEarned + ratingSum;

        // Updating user model fields stars and totalStarsEarned in DB
        await User.updateOne(
            { _id: user._id },
            {
                $set: {
                    stars: updatedStarCount,
                    totalStarsEarned: updatedTotalStarCount,
                },
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
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

        // // Get user who's pull request is being rated
        // const pullRequest = await PullRequest.find({ _id: req.params.id });
        // try {
        //   const getUserById = await axios.get(
        //     `http://localhost:8000/management/users/${pullRequest[0].user_id}`
        //   );
        //   const user = getUserById.data;

        //   //
        //   const updatedStarCount = user.stars + ratingSum;
        //   const updatedTotalStarCount = user.totalStarsEarned + ratingSum;

        //   // Update user object with added stars
        //   await axios.patch(
        //     `http://localhost:8000/management/users/update/${user._id}`,
        //     {
        //       name: user.name,
        //       email: user.email,
        //       password: user.password,
        //       hasRole: user.hasRole,
        //       git_username: user.git_username,

        //       // Fields updated:
        //       stars: updatedStarCount,
        //       totalStarsEarned: updatedTotalStarCount,
        //     }
        //   );
        // } catch (error) {
        //   res
        //     .status(500)
        //     .json({ message: "An error occurred while updating rating" });
        // }

        // Calling the method getUserByPullRequestRating to update the users stars and totalStarsEarned
        getUserByPullRequestRating(ratingSum, req.params.id);

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
    getUserByPullRequestRating,
};
