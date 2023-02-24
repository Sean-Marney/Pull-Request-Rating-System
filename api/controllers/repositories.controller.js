const axios = require("axios");
const User = require("../models/user.model");
const PullRequestModel = require("../models/pullRequest.model");



// Get all repositories from the GitHub service account ('t7serviceaccount')
const getAllRepositories = async (req, res) => {
  // Requires access token (generated on GitHub) as it's a private repository
  const token = "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";
  // Access token is inserted into the header
  const headers = {
    Authorization: `Token ${token}`,
  };

  try {
    // Uses GitHub API to get all repositories
    const response = await axios.get("https://api.github.com/user/repos", {
      headers,
    });
    res.status(response.status).send(response.data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Failed to fetch repositories from GitHub API" });
  }
};

// Get all pull requests (including merged ones) from the GitHub service account ('t7serviceaccount')
const getAllPullRequestsFromDB = async (req, res) => {
  try {
    let response = await getAllPullRequestsFromAPI();
    let apiPullRequests = response.pullRequests;
    let repos = response.repos;
    await updatePullRequestsToDatabase(apiPullRequests);
    let databasePullRequests = await PullRequestModel.find();
    let pullRequests = await changeName(databasePullRequests);

    res.status(200).send({"pullRequests": pullRequests, "repos": repos});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch pull requests from Database" });
  }
};


async function getAllPullRequestsFromAPI(){
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
      // Takes all pull requests from API and spreads them into pullRequests array (this array shows all pull requests in all repositories)
      pullRequests.push(...pullRequestResponse.data);
    }
    return ({"pullRequests": pullRequests, "repos": repos});
  } catch (err) {
    console.error(err);
  }
}



async function updatePullRequestsToDatabase(pullRequests) {
  let index = 0;
  // Needs to check that the pull request isn't in the database already
  const list = await PullRequestModel.find(); 
  while(index < pullRequests.length){
    if (list.some((item) => item.git_id.toString() != pullRequests[index].id.toString())) {
    } else {
      try {
        // Converts the date string into a date object
        let mergedDate = new Date(pullRequests[index].created_at);  

        // Retrieves the userID from git username
        let userID = await readUserID(pullRequests[index].user.login);
        
        const pullRequest = new PullRequestModel({
          git_id: pullRequests[index].id,
          url: pullRequests[index].html_url,
          repo: pullRequests[index].head.repo.name,
          user_id: userID,
          title: pullRequests[index].title,
          date: mergedDate,
          rating_complete: false
        });
        await pullRequest.save(); 
      } catch (error) {
        console.log(error);
      }
    }
    index = index +1;
  }
}

async function readUserID(gitUsername) {
  try{
    let user = await User.find({ git_username: gitUsername},{_id:1}); 
    return(user[0]._id); 
  }catch(error){
    console.log(error);
  }
}
async function readListOfFullNames() {
  try{
    let user = await User.find();
    return (user);
  }catch(error){
    console.log(error);
  }
}  
async function changeName(pullRequests){
  let users = await readListOfFullNames();
  pullRequests.forEach(pullRequest => {
    let user = users.find(user => user._id.toString() == "63f8cb63f910c75c3cc25ccb");
    pullRequest.user_id = user.name;
  });
  return pullRequests;
}

module.exports = { getAllRepositories, getAllPullRequestsFromDB };
