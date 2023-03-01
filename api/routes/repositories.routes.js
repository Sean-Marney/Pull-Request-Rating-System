const express = require("express");

const {getAllPullRequestsFromDB} = require("../controllers/repositories.controller");

const router = express.Router();

router.get("/allPulls", getAllPullRequestsFromDB);

module.exports = router;
