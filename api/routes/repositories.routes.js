const express = require("express");

const {
  getAllRepositories,
  getAllPullRequestsFromDB,
} = require("../controllers/repositories.controller");

const router = express.Router();

// router.get("/", getAllRepositories);
router.get("/allPulls", getAllPullRequestsFromDB);

module.exports = router;
