const mongoose = require('mongoose');
require('../models/flowers');
const Flower = mongoose.model('Flower');

// List all flowers
const flowersList = function(req, res) {
  Flower.find().then(flowers => {
    res.status(200).json(flowers);
  }).catch(err => {
    res.status(500).json(err);
  });
};

// Create a new flower
const flowersCreate = function(req, res) {
  Flower.create({
    name: req.body.name,
    picture: req.body.picture,
    rating: req.body.rating,
    description: req.body.description,
    careGuide: req.body.careGuide,
    votes: req.body.votes
  }).then(flower => {
    res.status(201).json(flower);
  }).catch(err => {
    res.status(400).json(err);
  });
};

// Read one flower by name
const flowersReadOne = function(req, res) {
  // checking if flowerName is provided
  if (req.params && req.params.flowerName) {
    Flower.findOne({ name: req.params.flowerName }).then((flower) => {
      if (!flower) {
        // No flower found with provided name
        res.status(404).json({
          message: `Flower with name "${req.params.flowerName}" not found.`
        });
        return;
      }
      // Flower found
      res.status(200).json(flower);
    }).catch(err => {
      res.status(500).json({
        message: "An error occurred while retrieving the flower.",
        error: err.message 
      });
    });
  } else {
    res.status(400).json({
      message: "No flowerName provided in the request parameters."
    });
  }
};

// Update one flower by name
const flowersUpdateOne = function(req, res) {
  if (req.params && req.params.flowerName) {
    Flower.findOneAndUpdate(
      { name: req.params.flowerName },
      {
        name: req.body.name,
        picture: req.body.picture,
        rating: req.body.rating,
        description: req.body.description,
        careGuide: req.body.careGuide,
        votes: req.body.votes
      },
      { new: true }
    ).then(flower => {
      if (!flower) {
        return res.status(404).json({ message: "Flower not found." });
      }
      res.status(200).json(flower);
    }).catch(err => {
      res.status(400).json({
        message: "An error occurred while updating the flower.",
        error: err.message 
      });
    });
  } else {
    res.status(400).json({ message: "No flowerName provided in the request parameters." });
  }
};

// Delete one flower by name
const flowersDeleteOne = function(req, res) {
  if (req.params && req.params.flowerName) {
    Flower.findOneAndDelete({ name: req.params.flowerName }).then(flower => {
      if (!flower) {
        return res.status(404).json({ message: "Flower not found." });
      }
      res.status(204).send(); 
    }).catch(err => {
      res.status(500).json({
        message: "An error occurred while deleting the flower.",
        error: err.message 
      });
    });
  } else {
    res.status(400).json({ message: "No flowerName provided in the request parameters." });
  }
};

module.exports = {
  flowersList,
  flowersCreate,
  flowersReadOne,
  flowersUpdateOne,
  flowersDeleteOne
};
