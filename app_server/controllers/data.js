const data = function(req, res) {
  res.render('data', {
    title: 'Data',   
    flower: {       
      name: 'Dahlia',
      picture: '../images/1.jpg',   
      rating: 3,
      description: 'Dahlias are perennial plants with tuberous roots',
      careGuide: {
        level: 'beginner',
        temperature: '29°C',
        light: 'full sun',
        water: 'every week',
        fertilize: 'high in potassium and phosphorus',
        bloomTime: 'summer, autumn',
      },
      votes: 53,
    }
  });
};

module.exports = {
  data
};
