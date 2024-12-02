const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.processRegistration = function (req, res) {
  try {
    const { firstName, lastName, username, email, password, confirmPassword, favouriteFlower } = req.body;

    console.log('Registration data:', req.body);

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !favouriteFlower) {
      console.error('Registration failed: Missing required fields');
      return res.status(400).render('register', {
        info: {
          title: 'Register',
          pageHeader: {
            title: 'Join PrettyPetals',
            strapline: 'Sign up to explore beautiful flowers',
          },
          error: 'All fields are required.',
          form: req.body,
        },
      });
    }

    if (password !== confirmPassword) {
      console.error('Registration failed: Passwords do not match');
      return res.status(400).render('register', {
        info: {
          title: 'Register',
          pageHeader: {
            title: 'Join PrettyPetals',
            strapline: 'Sign up to explore beautiful flowers',
          },
          error: 'Passwords do not match.',
          form: req.body,
        },
      });
    }

    User.findOne({ $or: [{ email }, { username }] })
      .then((existingUser) => {
        if (existingUser) {
          console.error('Registration failed: User already exists');
          return res.status(400).render('register', {
            info: {
              title: 'Register',
              pageHeader: {
                title: 'Join PrettyPetals',
                strapline: 'Sign up to explore beautiful flowers',
              },
              error: 'User with this email or username already exists.',
              form: req.body,
            },
          });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).render('register', {
              info: {
                title: 'Register',
                pageHeader: {
                  title: 'Join PrettyPetals',
                  strapline: 'Sign up to explore beautiful flowers',
                },
                error: 'An error occurred while processing your password. Please try again later.',
                form: req.body,
              },
            });
          }

          console.log('Hashed Password:', hashedPassword);

          const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            favouriteFlower,
          });

          newUser.save()
            .then(() => {
              console.log('Registration successful for user:', username);
              res.redirect('/login');
            })
            .catch((err) => {
              console.error('Error during registration process:', err);
              res.status(500).render('register', {
                info: {
                  title: 'Register',
                  pageHeader: {
                    title: 'Join PrettyPetals',
                    strapline: 'Sign up to explore beautiful flowers',
                  },
                  error: 'An error occurred while saving your data. Please try again later.',
                  form: req.body,
                },
              });
            });
        });
      })
      .catch((err) => {
        console.error('Error during registration check:', err);
        res.status(500).render('register', {
          info: {
            title: 'Register',
            pageHeader: {
              title: 'Join PrettyPetals',
              strapline: 'Sign up to explore beautiful flowers',
            },
            error: 'An error occurred. Please try again later.',
            form: req.body,
          },
        });
      });
  } catch (err) {
    console.error('Unexpected error during registration:', err);
    res.status(500).render('register', {
      info: {
        title: 'Register',
        pageHeader: {
          title: 'Join PrettyPetals',
          strapline: 'Sign up to explore beautiful flowers',
        },
        error: 'An unexpected error occurred. Please try again later.',
        form: req.body,
      },
    });
  }
};

exports.processLogin = async function (req, res) {
  try {
    const { email, password } = req.body;

    console.log('Login attempt with email:', email);

    if (!email || !password) {
      console.error('Login failed: Missing email or password');
      return res.status(400).render('login', {
        info: {
          error: 'Both email and password are required.',
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.error('Login failed: Invalid email');
      return res.status(400).render('login', {
        info: {
          error: 'Invalid email.',
        },
      });
    }

    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Login failed: Invalid password');
      return res.status(400).render('login', {
        info: {
          error: 'Invalid password.',
        },
      });
    }

    console.log('Login successful for user:', user.username);
    res.redirect('/data');

  } catch (err) {
    console.error('Unexpected error during login process:', err);
    res.status(500).render('login', {
      info: {
        error: 'An unexpected error occurred. Please try again later.',
      },
    });
  }
};
