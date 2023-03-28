const express = require('express');
const router = express.Router();

const emailController = require('../controllers/ManagerHelp.controller');

router.post('/management/ManagerHelp', emailController.sendEmail);

module.exports = router;
