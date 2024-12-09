const User = require('../models/user');

const validateRegistration = ({ firstName, lastName, username, email, password, confirmPassword, favouriteFlower }) => {
  if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !favouriteFlower) {
    return 'All fields are required.';
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Invalid email format.';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
  }

  return null;
};

exports.register = (req, res) => {
  const info = {
    title: 'Registration',
    form: {
      firstName: { placeholder: 'Enter your First Name', value: '' },
      lastName: { placeholder: 'Enter your Last Name', value: '' },
      username: { placeholder: 'Enter your Username', value: '' },
      email: { placeholder: 'Enter your E-mail', value: '' },
      password: { placeholder: 'Enter your Password', value: '' },
      confirmPassword: { placeholder: 'Repeat your Password', value: '' },
      favouriteFlower: { placeholder: 'Enter your Favourite Flower', value: '' },
    },
  };

  res.render('registration', { info });
};

exports.processRegistration = async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword, favouriteFlower } = req.body;

  const error = validateRegistration({ firstName, lastName, username, email, password, confirmPassword, favouriteFlower });
  if (error) {
    return res.status(400).render('registration', {
      info: {
        error,
        form: {
          firstName: { placeholder: 'Enter your First Name', value: firstName },
          lastName: { placeholder: 'Enter your Last Name', value: lastName },
          username: { placeholder: 'Enter your Username', value: username },
          email: { placeholder: 'Enter your E-mail', value: email },
          favouriteFlower: { placeholder: 'Enter your Favourite Flower', value: favouriteFlower },
          password: { placeholder: 'Enter your Password', value: '' }, 
          confirmPassword: { placeholder: 'Repeat your Password', value: '' }, 
        },
      },
    });
  }

  try {
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      favouriteFlower,
    });

    await User.register(user, password); 
    res.redirect('/login');
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).render('registration', {
      info: {
        error: err.code === 11000 ? 'A user with this email or username already exists.' : 'An unexpected error occurred. Please try again later.',
        form: {
          firstName: { placeholder: 'Enter your First Name', value: firstName },
          lastName: { placeholder: 'Enter your Last Name', value: lastName },
          username: { placeholder: 'Enter your Username', value: username },
          email: { placeholder: 'Enter your E-mail', value: email },
          favouriteFlower: { placeholder: 'Enter your Favourite Flower', value: favouriteFlower },
          password: { placeholder: 'Enter your Password', value: '' }, 
          confirmPassword: { placeholder: 'Repeat your Password', value: '' }, 
        },
      },
    });
  }
};
