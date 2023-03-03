const Tracker = require("../models/tracker.model");

// CRUD methods for trackers

// Get all trackers
const getTrackers = async (req, res) => {
    try {
        const trackers = await Tracker.find();
        res.status(200).json(trackers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { getTrackers };
