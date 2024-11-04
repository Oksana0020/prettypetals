// app_api/controllers/auth.js
const User = require('../models/user'); // Ensure to import the user model
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT tokens

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable in production

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user.', error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Create and assign a token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in.', error: err.message });
    }
};

module.exports = {
    register,
    login,
};
