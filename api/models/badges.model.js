const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: Buffer
  }
});

const Badges = mongoose.model("Badges", BadgeSchema);
module.exports = Badges;
