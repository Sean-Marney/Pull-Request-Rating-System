const express = require("express");
const {getNameForLevel,getAll} = require("../controllers/level.controller");

const router = express.Router();

// gets the pull request for a user
router.get("/name/:id", getNameForLevel);
router.get("/all", getAll);

module.exports = router;
