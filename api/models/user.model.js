const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hasRole: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    default: 0,
  },
  totalStarsEarned: {
    type: Number,
    default: 0,
  },
  git_username: {
    type: String,
  },
  bio: {
    type: String,
  },
  level: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
