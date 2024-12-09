const passport = require('passport');
const User = require('../models/user');

exports.login = (req, res) => {
  res.render('login', {
    title: 'Login',
    pageHeader: {
      title: 'Welcome Back',
      strapline: 'Please log in to PrettyPetals portal',
    },
    error: null, 
  });
};

exports.processLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).render('login', {
      title: 'Login',
      pageHeader: {
        title: 'Welcome Back',
        strapline: 'Please log in to PrettyPetals portal',
      },
      error: 'Both username and password are required.',
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).render('login', {
        title: 'Login',
        pageHeader: {
          title: 'Welcome Back',
          strapline: 'Please log in to PrettyPetals portal',
        },
        error: 'Username not found.',
      });
    }

    const isMatch = await user.authenticate(password); 
    if (!isMatch) {
      return res.status(400).render('login', {
        title: 'Login',
        pageHeader: {
          title: 'Welcome Back',
          strapline: 'Please log in to PrettyPetals portal',
        },
        error: 'Incorrect password.',
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Login Error:', err.message);
        return res.status(500).render('login', {
          title: 'Login',
          pageHeader: {
            title: 'Welcome Back',
            strapline: 'Please log in to PrettyPetals portal',
          },
          error: 'An unexpected error occurred. Please try again later.',
        });
      }

      return res.redirect('/data');
    });
  } catch (err) {
    console.error('Unexpected Login Error:', err.message);
    res.status(500).render('login', {
      title: 'Login',
      pageHeader: {
        title: 'Welcome Back',
        strapline: 'Please log in to PrettyPetals portal',
      },
      error: 'An unexpected error occurred. Please try again later.',
    });
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect('/login');
    });
  });
};
