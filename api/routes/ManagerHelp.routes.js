const express = require('express');
const router = express.Router();

const emailController = require('../controllers/ManagerHelp.controller');

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.post('/management/ManagerHelp', verifyManger, emailController.sendEmail);

module.exports = router;
