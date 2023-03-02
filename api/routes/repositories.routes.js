const express = require("express");

const {
    getAllPullRequestsFromAPI,
    getAllPullRequestsFromDB,
} = require("../controllers/repositories.controller");

const router = express.Router();

router.get("/", getAllPullRequestsFromAPI);
router.get("/allPulls", getAllPullRequestsFromDB);

module.exports = router;
