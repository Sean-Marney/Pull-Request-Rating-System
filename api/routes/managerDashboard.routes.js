const express = require('express');
const router = express.Router();
const managerDashController = require('../controllers/managerDash.controller');


// Requests route
router.get('/requests', managerDashController.getRequests);

// Archived rewards route
router.get('/archived-rewards', managerDashController.getArchivedRewards);

module.exports = router;
