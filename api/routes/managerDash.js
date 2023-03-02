// managerDash.routes.js

const express = require('express');
const router = express.Router();
const  managerDash = require('../controllers/managerDash.controller');

router.get('/requests', managerDash.getRequests);

module.exports = router;
