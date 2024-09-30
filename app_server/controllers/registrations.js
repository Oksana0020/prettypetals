/* GET 'login' page */
const login = function(req, res) {
  res.render('index', { title: 'Login' });
};

/* GET 'registration' page */
const register = function(req, res) {
  res.render('index', { title: 'Register' });
};

module.exports = {
  login,
  register
};
