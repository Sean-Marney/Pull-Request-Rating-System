const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard.controller.js');

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.get('/management/Leaderboard', verifyManger, leaderboardController.getLeaderboard);

module.exports = router;