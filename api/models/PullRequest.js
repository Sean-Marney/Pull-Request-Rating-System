const mongoose = require("mongoose");

const PullRequestSchema = new mongoose.Schema({
  pullRequestID: {
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
  userID: {
    type: String,
    required: true,
  },
  ratingComplete: {
    type: Boolean,
    required: true,
  },
});

const PullRequest = mongoose.model("PullRequest", PullRequestSchema);
module.exports = PullRequest;
