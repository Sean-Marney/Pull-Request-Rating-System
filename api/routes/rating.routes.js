const express = require("express");
const {
    createRating,
} = require("../controllers/rating.controller");

const router = express.Router();

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.put("/update/:id", verifyManger, createRating);

module.exports = router;
