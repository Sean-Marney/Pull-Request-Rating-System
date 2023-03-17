const PullRequest = require("../models/pullRequest.mode");
const User = require("../models/user.model");
// Reads the pull request for a user
// Takes in the id as a parameter and then returns the pull requests
const getPullRequestsForUser = async (req, res) => {
    try {
        dkfsjsadkfljdfskjdsfksdfjsdfkjdsf ksdf,jdsfkjsdfksdfjdsfkfsdjksdfajsdfaksdafjlksdfjsdf;
        const parameter = req.params;
        var sortByDate = { date: -1 };
        // Retrieves user id for the user with that email address
        const user = await User.findOne({ email: parameter.id },{ _id: 1 });
        if (user == null) {
            res.status(404).json({ message: "User with that email was not found" });
        }else{
            // Reads from the db with the list of pull requests for that user
            const pullRequests = await PullRequest.find({
                user_id: user._id,
            }).sort(sortByDate);
            res.status(200).json(pullRequests);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getPullRequestsForUser,
};
