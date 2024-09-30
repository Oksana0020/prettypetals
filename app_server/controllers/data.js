/* GET 'data' page */
const data = function(req, res) {
  res.render('index', { title: 'Data' });
};

module.exports = {
  data
};
