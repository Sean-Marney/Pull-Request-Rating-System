const express = require("express");

const {getAllPullRequestsFromDB} = require("../controllers/repositories.controller");

const router = express.Router();

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.get("/allPulls", verifyManger, getAllPullRequestsFromDB);

module.exports = router;
