const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Levels = mongoose.model("Levels", LevelSchema);
module.exports = Levels;
