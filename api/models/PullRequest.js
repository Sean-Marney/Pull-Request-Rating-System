const mongoose = require("mongoose");
// Model for the pull request
const PullRequestSchema = new mongoose.Schema({
  git_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  rating_complete: {
    type: Boolean,
    required: true,
  },
});

const PullRequest = mongoose.model("PullRequest", PullRequestSchema);
module.exports = PullRequest;
