const express = require("express");
const router = express.Router();
const {
    getTrackers,
    createTracker,
    updateTracker,
    deleteTracker,
    getTrackerById
} = require("../controllers/tracker.controller");

router.get("/", getTrackers);
router.get("/:id", getTrackerById);
router.post("/create", createTracker);
router.patch("/update/:id", updateTracker);
router.delete("/delete/:id", deleteTracker);

module.exports = router;
