const axios = require("axios");

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
const getAllPullRequests = async (req, res) => {
  const token = "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";
  const headers = {
    Authorization: `Token ${token}`,
  };

  try {
    // Uses GitHub API to get all repositories
    const response = await axios.get("https://api.github.com/user/repos", {
      headers,
    });

    // Loops through all repositories to get their pull requests
    const pullRequests = [];
    for (const repo of response.data) {
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

    res.status(200).send(pullRequests);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Failed to fetch pull requests from GitHub API" });
  }
};

module.exports = { getAllRepositories, getAllPullRequests };
