const express = require('express');
const router = express.Router();
const ctrlFlowers = require('../controllers/flowers');

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

module.exports = router;
