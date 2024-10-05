/* GET 'data' page */
const data = function(req, res) {
  console.log('Data page requested');
  res.render('data', { title: 'Data' });
};

module.exports = {
  data
};

