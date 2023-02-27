const mongoose = require("mongoose");
// Model for the tracker 
const TrackerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    currently_used: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const Tracker = mongoose.model("Tracker", TrackerSchema);
module.exports = Tracker;
