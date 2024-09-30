/* GET 'login' page */
const login = function(req, res) {
  res.render('login', { title: 'Login' });
};

/* GET 'Register' page */
const register = function(req, res) {
  res.render('registration', { title: 'Register' });
};

module.exports = {
  login,
  register
};

