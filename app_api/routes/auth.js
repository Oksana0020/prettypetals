const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); 

router.post('/register', authController.register); // POST for registration
router.post('/login', authController.login);       // POST for login

module.exports = router;
