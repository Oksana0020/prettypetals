const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const registrationController = require('../controllers/registrations');
const ctrlData = require('../controllers/data');
const ctrlFlowers = require('../../app_api/controllers/flowers');

// Login Pages (Auth Controller)
router.get('/login', authController.login);
router.post('/login', authController.processLogin);

// Registration Pages (Registration Controller)
router.get('/registration', registrationController.register);
router.post('/registration', registrationController.processRegistration);

// Data Pages
router.get('/data', ctrlData.getFlowersData);
router.get('/flowers', ctrlFlowers.flowersList);

module.exports = router;
