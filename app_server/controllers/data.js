const data = function(req, res) {
  res.render('data', {
    title: 'Data',    
    product: {
      name: 'Dahlia',   
      picture: '/images/1.jpg',   
      rating: 3,    
      description: 'Dahlias are perennial plants with tuberous roots, though they are grown as annuals in some regions with cold winters. While some have herbaceous stems, others have stems which lignify in the absence of secondary tissue and resprout following winter dormancy, allowing further seasons of growth.',
      careGuide: {
        level: 'beginner',    
        temperature: '29°C',   
        light: 'full sun',   
        water: 'every week',  
        fertilize: 'high in potassium and phosphorus',   
        bloomTime: 'summer, autumn'  
      },
      votes: 53    
    }
  });
};

module.exports = {
  data
};
