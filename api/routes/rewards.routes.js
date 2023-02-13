const express = require("express");

const { getRewards } = require("../controllers/manageRewards.controller");

const router = express.Router();

router.get("/", getRewards);

module.exports = router;
