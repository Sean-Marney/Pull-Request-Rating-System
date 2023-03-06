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
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rating_complete: {
    type: Boolean,
    required: true,
  },
  ratings: {
    type: Object,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
});

const PullRequest = mongoose.model("PullRequest", PullRequestSchema);
module.exports = PullRequest;
