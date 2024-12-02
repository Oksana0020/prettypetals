const User = require('../models/user'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

// validation for username (letters only) and password (numbers only)
const isValidUsername = (username) => /^[A-Za-z]+$/.test(username);  
const isValidPassword = (password) => /^[0-9]+$/.test(password);      

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Validate username and password
        if (!isValidUsername(username)) {
            return res.status(400).json({ message: 'Username must only contain letters.' });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ message: 'Password must only contain numbers.' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).redirect('http://localhost:8000/registration');
    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ message: 'Error registering user.', error: err.message });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }


        if (!isValidUsername(username)) {
            return res.status(400).json({ message: 'Username must only contain letters.' });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ message: 'Password must only contain numbers.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).redirect('http://localhost:8000/data');
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Error logging in.', error: err.message });
    }
};


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

module.exports = {
    register,
    login,
};
