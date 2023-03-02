const express = require("express");
const router = express.Router();
const { getTrackers } = require("../controllers/tracker.controller");

router.get("/", getTrackers);

module.exports = router;
