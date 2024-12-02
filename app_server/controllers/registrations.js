const bcrypt = require('bcryptjs');
const User = require('../models/user');

const validateRegistration = ({ firstName, lastName, username, email, password, confirm, favouriteFlower }) => {
  if (!firstName || !lastName || !username || !email || !password || !confirm || !favouriteFlower) {
    return 'All fields are required.';
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Invalid email format.';
  }

  if (password !== confirm) {
    return 'Passwords do not match.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  // Validate password  one lowercase, one uppercase and one digit
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
  }

  return null; 
};

const register = (req, res) => {
  const info = {
    title: 'Registration',
    form: {
      firstName: { placeholder: 'Enter your First Name' },
      lastName: { placeholder: 'Enter your Last Name' },
      username: { placeholder: 'Enter your Username' },
      email: { placeholder: 'Enter your E-mail' },
      password: { placeholder: 'Enter your Password' },
      confirm: { placeholder: 'Repeat your Password' },
      favouriteFlower: { placeholder: 'Enter your Favourite flower' },
    },
  };

  res.render('registration', { info });
};

const processRegistration = (req, res) => {
  const { firstName, lastName, username, email, password, confirm, favouriteFlower } = req.body;

  const error = validateRegistration(req.body);
  if (error) {
    return res.status(400).render('registration', {
      info: {
        error,
        form: { firstName, lastName, username, email, favouriteFlower, password, confirm },
      },
    });
  }

  // Hash password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).render('registration', {
        info: { error: 'Internal server error. Please try again later.' },
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      favouriteFlower,
    });

    newUser
      .save()
      .then(() => {
        res.redirect('/login');
      })
      .catch((err) => {
        console.error('Error saving user:', err);
        const errorMessage =
          err.code === 11000
            ? 'A user with this email or username already exists.'
            : 'An unexpected error occurred. Please try again later.';
        res.status(500).render('registration', {
          info: {
            error: errorMessage,
            form: { firstName, lastName, username, email, favouriteFlower, password, confirm },
          },
        });
      });
  });
};

const login = (req, res) => {
  const info = {
    title: 'Login',
    pageHeader: {
      title: 'Welcome Back',
      strapline: 'Please log in to PrettyPetals portal',
    },
    error: null,
  };

  if (!info.pageHeader) {
    info.pageHeader = {
      title: 'Default Title',
      strapline: 'Default Strapline',
    };
  }

  res.render('login', { info });
};


const processLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render('login', {
      info: { error: 'Email and password are required.' },
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('login', {
        info: { error: 'Invalid email or password.' },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render('login', {
        info: { error: 'Invalid email or password.' },
      });
    }

    res.redirect('/data'); 
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).render('login', {
      info: { error: 'An unexpected error occurred. Please try again later.' },
    });
  }
};

module.exports = {
  register,
  login,
  processRegistration,
  processLogin,
};
