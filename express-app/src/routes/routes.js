const express = require('express');
const { createUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Tunsrot');
});

router.post('/users', createUser);

module.exports = router;