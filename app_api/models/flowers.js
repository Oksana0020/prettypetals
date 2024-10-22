const mongoose = require('mongoose');

// CareGuide Schema
const careGuideSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    },
    light: {
        type: String,
        required: true
    },
    water: {
        type: String,
        required: true
    },
    fertilize: {
        type: String,
        required: true
    },
    bloomTime: {
        type: String,
        required: true
    }
});

// Flower Schema
const flowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
    careGuide: careGuideSchema, 
    votes: {
        type: Number,
        default: 0
    }
});

// Create the Mongoose model for flowers
mongoose.model('Flower', flowerSchema, 'flowers');
