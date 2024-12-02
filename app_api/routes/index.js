const express = require('express');
const router = express.Router();
const ctrlFlowers = require('../controllers/flowers'); 
const authRoutes = require('./auth');  

router
  .route('/flowers')
  .get(ctrlFlowers.flowersList)  
  .post(ctrlFlowers.flowersCreate);  

router
  .route('/flowers/:flowerName')
  .get(ctrlFlowers.flowersReadOne)  
  .put(ctrlFlowers.flowersUpdateOne)  
  .delete(ctrlFlowers.flowersDeleteOne);  

router.use('/auth', authRoutes); 

module.exports = router;
