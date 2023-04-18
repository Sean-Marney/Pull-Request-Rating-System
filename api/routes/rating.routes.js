const express = require("express");
const {
    createRating,
} = require("../controllers/rating.controller");

const router = express.Router();

router.put("/update/:id", createRating);

module.exports = router;
