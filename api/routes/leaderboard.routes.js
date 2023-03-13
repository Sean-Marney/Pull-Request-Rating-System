const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard.controller.js');

router.get('/management/Leaderboard', leaderboardController.getLeaderboard);

module.exports = router;