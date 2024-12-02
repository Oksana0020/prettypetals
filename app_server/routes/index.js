const express = require('express');
const router = express.Router();
const ctrlRegistrations = require('../controllers/registrations');
const ctrlData = require('../controllers/data');
const ctrlFlowers = require('../../app_api/controllers/flowers');
const authRoutes = require('../../app_api/routes/auth'); 

// Registrations pages
router.get('/login', ctrlRegistrations.login);
router.post('/login', ctrlRegistrations.processLogin); 
router.get('/registration', ctrlRegistrations.register);
router.post('/registration', ctrlRegistrations.processRegistration);

// Data pages
router.get('/data', ctrlData.getFlowersData);
router.get('/flowers', ctrlFlowers.flowersList);
router.use('/auth', authRoutes);

module.exports = router;
