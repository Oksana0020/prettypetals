const express = require('express');
const router = express.Router();
const ctrlRegistrations = require('../controllers/registrations');  
const ctrlData = require('../controllers/data');  
const ctrlFlowers = require('../../app_api/controllers/flowers');


/* Registrations pages */
router.get('/login', ctrlRegistrations.login);      
router.get('/registration', ctrlRegistrations.register); 

/* Data page */
router.get('/data', ctrlData.getFlowersData); 
router.get('/flowers', ctrlFlowers.flowersList);

module.exports = router;


