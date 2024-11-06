const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://wsrender.onrender.com'; 
};

// Render flowers data
const _renderFlowersPage = function (req, res, flowersData) {
  const quote = {
    lines: [
      "They are autographs of angels, penned",
      "In Nature’s green-leaved book, in blended tints,",
      "Borrowed from rainbows and the sunset skies,",
      "And written everywhere–on plain and hill,",
      "In lonely dells, ‘mid crowded haunts of men;",
      "On the broad prairies, where no eye save God’s",
      "May read their silent, sacred mysteries. Thank God for flowers!",
      "They gladden human hearts; Seraphic breathings part their fragrant lips",
      "With whisperings of Heaven."
    ],
    author: "Albert Laighton"
  };

  res.render('data', {
    title: 'Flowers Data',
    flowers: flowersData,
    quote
  });
};

// fetching flowers from API
const getFlowersData = function (req, res) {
  const path = '/api/flowers';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, { statusCode }, body) => {
    if (err) {
      console.error("Error fetching flowers data:", err);
      res.status(500).json(err);
    } else if (statusCode !== 200) {
      console.error("API responded with status:", statusCode);
      res.status(statusCode).json(body);
    } else {
      _renderFlowersPage(req, res, body);
    }
  });
};

module.exports = {
  getFlowersData
};
