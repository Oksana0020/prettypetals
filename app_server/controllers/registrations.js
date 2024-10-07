/* GET 'registration' page */
const register = function(req, res) {
  const info = { 
    title: 'Registration',
    form: {
      firstName: {
        placeholder: 'Enter your First Name'
      },
      lastName: {
        placeholder: 'Enter your Last Name'
      },
      username: {
        placeholder: 'Enter your Username'
      },
      email: {
        placeholder: 'Enter your E-mail'
      },
      password: {
        placeholder: 'Enter your Password'
      },
      confirm: {
        placeholder: 'Repeat your Password'
      },
      favouriteFlower: {
        placeholder: 'Enter your Favourite flower'
      }
    }
  };

  console.log('Info sent to registration.pug:', info); 
  res.render('registration', { info }); 
};

/* GET 'login' page */
const login = function(req, res) {
  const info = { 
    title: 'Login',
    pageHeader: { 
      title: 'Welcome Back',
      strapline: 'Please log in to PrettyPetals portal'
    },
    error: null 
  };

  console.log('Info sent to login.pug:', info); 
  res.render('login', { info }); 
};

module.exports = {
  register,
  login
};
