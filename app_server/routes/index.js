const express = require('express');
const router = express.Router();
const ctrlRegistrations = require('../controllers/registrations');
const ctrlData = require('../controllers/data');

/* Registrations pages */
router.get('/login', ctrlRegistrations.login);      
router.get('/registration', ctrlRegistrations.register); 

/* Data page */
router.get('/data', ctrlData.data);  

module.exports = router;






