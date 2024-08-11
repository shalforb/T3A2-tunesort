const express = require('express');
const { createUser, loginUser, getUserInfo } = require('../controllers/userController'); 
const authMiddleware = require('../../middleware/auth'); 
const router = express.Router();



router.get('/api/users', authMiddleware, getUserInfo); 
router.post('/create', createUser); 
router.post('/login', loginUser);  



module.exports = router;