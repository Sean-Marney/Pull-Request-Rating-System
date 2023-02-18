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

module.exports = { getAllRepositories };
