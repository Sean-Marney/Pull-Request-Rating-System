const axios = require("axios");
const User = require("../models/user.model");
const PullRequestModel = require("../models/pullRequest.model");

// Function that returns the list of repos and pull requests from the database
// Function that returns the list of repos and pull requests from the database
const getAllPullRequestsFromDB = async (req, res) => {
    try {
        let response = await getAllPullRequestsFromAPI();
        let apiPullRequests = response.pullRequests;
        let repos = response.repos;
        let databasePullRequests = await updatePullRequestsToDatabase(
            apiPullRequests
        );
        let pullRequests = await changeName(databasePullRequests);
        res.status(200).send({ pullRequests: pullRequests, repos: repos });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Failed to fetch pull requests from Database",
        });
    }
};

// Reads list of Repositories and Pull Requests from GitHub API
async function getAllPullRequestsFromAPI() {
    const token = "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";
    const headers = {
        Authorization: `Token ${token}`,
    };
    try {
        // Uses GitHub API to get all repositories
        const response = await axios.get("https://api.github.com/user/repos", {
            headers,
        });
        let repos = response.data;
        // Loops through all repositories to get their pull requests
        const pullRequests = [];
        for (const repo of repos) {
            const pullRequestResponse = await axios.get(
                // State is set to "all" so that it returns both merged and unmerged pull requests
                `https://api.github.com/repos/t7serviceaccount/${repo.name}/pulls?state=all`,
                {
                    headers,
                }
            );
            // Takes all pull requests from API and adds them into pullRequests array (this array shows all pull requests in all repositories)
            pullRequests.push(...pullRequestResponse.data);
        }
        // Returns object containing arrays of pull requests and repositories
        return { pullRequests: pullRequests, repos: repos };
    } catch (err) {
        console.error(err);
    }
}

// Compares the list of pull requests from the API to the list of pull requests in the databasea
// If the pull request is not in the database, it adds it to the database
async function updatePullRequestsToDatabase(pullRequests) {
    let index = 0;
    // Needs to check that each pull request isn't in the database already
    const list = await PullRequestModel.find();
    while (index < pullRequests.length) {
        let needToAdd = true;
        list.forEach((item) => {
            if (item.git_id.toString() === pullRequests[index].id.toString()) {
                needToAdd = false;
            }
        });
        // If the pull request is not in the database, it adds it to the database
        if (needToAdd === true) {
            try {
                // Converts the date string into a date object
                let mergedDate = new Date(pullRequests[index].created_at);
                // Retrieves the userID from git username
                let userID = await readUserID(pullRequests[index].user.login);
                // Doesn't add the pull request to the database if the user is not in the database
                if (userID != undefined) {
                    const pullRequest = new PullRequestModel({
                        git_id: pullRequests[index].id,
                        url: pullRequests[index].html_url,
                        repo: pullRequests[index].head.repo.name,
                        user_id: userID,
                        title: pullRequests[index].title,
                        date: mergedDate,
                        rating_complete: false,
                        ratings: {},
                    });
                    await pullRequest.save();
                    // Adds new pull request to the list of pull requests from the db
                    list.push(pullRequest);
                }
            } catch (error) {
                console.log(error);
            }
        }
        index = index + 1;
    }
    return list;
}

// Reads the userID from the git username
// Reads the userID from the git username
async function readUserID(gitUsername) {
    try {
        let user = await User.find({ git_username: gitUsername }, { _id: 1 });
        return user[0]._id;
    } catch (error) {
        console.log(error);
    }
}

// Reads the list of full names from the database

// Reads the list of full names from the database
async function readListOfFullNames() {
    try {
        let user = await User.find();
        return user;
    } catch (error) {
        console.log(error);
    }
}

// Changes the userID to the full name to make it more readable for the manager
async function changeName(pullRequests) {
    let users = await readListOfFullNames();
    pullRequests.forEach((pullRequest) => {
        let user = users.find(
            (user) => user._id.toString() == pullRequest.user_id.toString()
        );
        if (user != undefined) {
            pullRequest.users_name = user.name;
        }
    });
    return pullRequests;
}

module.exports = {
    getAllPullRequestsFromDB,
    readUserID,
    readListOfFullNames,
    changeName,
    getAllPullRequestsFromAPI,
    updatePullRequestsToDatabase,
};
