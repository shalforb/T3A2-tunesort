const express = require('express');
const { welcomeMessage } = require('../controllers/welcomeController');
const router = express.Router();


router.get('/', welcomeMessage);

module.exports = router;