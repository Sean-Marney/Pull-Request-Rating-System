const axios = require("axios");

// Get all repositories from the GitHub service account ('t7serviceaccount')
const getAllRepositories = async (req, res) => {
  const token = "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";
  const headers = {
    Authorization: `Token ${token}`,
  };

  try {
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
