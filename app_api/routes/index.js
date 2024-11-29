//MyProject/app_api/routes/index.js
const express = require('express');
const router = express.Router();
const ctrlFlowers = require('../controllers/flowers'); 
const authRoutes = require('./auth'); 

// Flowers routes
router
  .route('/flowers')
  .get(ctrlFlowers.flowersList)  
  .post(ctrlFlowers.flowersCreate);  

router
  .route('/flowers/:flowerName')
  .get(ctrlFlowers.flowersReadOne)  
  .put(ctrlFlowers.flowersUpdateOne)  
  .delete(ctrlFlowers.flowersDeleteOne);  

// Authentication routes
router.use('/auth', authRoutes); // Prefix auth routes with /auth

module.exports = router;
