const express = require("express");
const router = express.Router();
const {
    getTrackers,
    createTracker,
    updateTracker,
    deleteTracker,
    getTrackerById
} = require("../controllers/tracker.controller");

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.get("/", verifyManger, getTrackers);
router.get("/:id", verifyManger, getTrackerById);
router.post("/create", verifyManger, createTracker);
router.patch("/update/:id", verifyManger, updateTracker);
router.delete("/delete/:id", verifyManger, deleteTracker);

module.exports = router;
