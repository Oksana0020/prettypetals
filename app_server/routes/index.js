const express = require('express');
const path = require('path'); 
const router = express.Router();
const authController = require('../controllers/auth');
const registrationController = require('../controllers/registrations');
const ctrlFlowers = require('../../app_api/controllers/flowers');

// Login Pages
router.get('/login', authController.login);
router.post('/login', authController.processLogin);

// Registration Pages
router.get('/registration', registrationController.register);
router.post('/registration', registrationController.processRegistration);

// API Endpoint for Flowers
router.get('/flowers', ctrlFlowers.flowersList);

module.exports = router;
