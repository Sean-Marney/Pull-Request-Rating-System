const express = require("express");
const {getAll} = require("../controllers/badges.controller");

const router = express.Router();

router.get("/all", getAll);
module.exports = router;
