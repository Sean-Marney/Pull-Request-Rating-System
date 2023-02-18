const express = require("express");

const {
  getAllRepositories,
  getAllPullRequests,
} = require("../controllers/repositories.controller");

const router = express.Router();

router.get("/", getAllRepositories);
router.get("/allPulls", getAllPullRequests);

module.exports = router;
