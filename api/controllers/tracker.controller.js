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

// Get a tracker by ID
const getTrackerById = async (req, res) => {
    try {
        const tracker = await Tracker.findById(req.params.id);
        if (!tracker) {
            return res
                .status(404)
                .json({ message: "Tracker with that ID was not found" });
        }

        res.status(200).json(tracker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a tracker
const createTracker = async (req, res) => {
    try {
        const tracker = new Tracker({
            name: req.body.name,
        });
        await tracker.save();

        res.status(201).json(tracker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tracker
const updateTracker = async (req, res) => {
    try {
        const tracker = await Tracker.findById(req.params.id);
        if (!tracker) {
            return res
                .status(404)
                .json({ message: "Tracker with that ID not found" });
        }

        tracker.name = req.body.name;
        await tracker.save();

        res.status(200).json(tracker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a tracker
const deleteTracker = async (req, res) => {
    try {
        const tracker = await Tracker.findById(req.params.id);
        if (!tracker) {
            return res
                .status(404)
                .json({ message: "Tracker with that ID not found" });
        }

        await tracker.remove();

        res.status(200).json({ message: "Tracker deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTrackers,
    createTracker,
    updateTracker,
    deleteTracker,
    getTrackerById,
};

