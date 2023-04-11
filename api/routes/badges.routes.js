const express = require("express");
const {getAll, getAllNames} = require("../controllers/badges.controller");

const router = express.Router();

router.get("/all", getAll);
router.get("/all/names", getAllNames);

module.exports = router;
