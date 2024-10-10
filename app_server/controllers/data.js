const data = function(req, res) {
  res.render('data', {
    title: 'Data',

    // Dahlia
    flower1: {
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
    },

    // Chrysanthemum
    flower2: {
      name: 'Chrysanthemum',
      picture: '/images/2.jpg',
      rating: 4,
      description: 'The genus Chrysanthemum are perennial herbaceous flowering plants, sometimes subshrubs. The leaves are alternate, divided into leaflets and may be pinnatisect, lobed, or serrate (toothed) but rarely entire. The simple row of ray florets is white, yellow, or red. The disc florets are yellow.',
      careGuide: {
        level: 'beginner',
        temperature: '27°C',
        light: '6 hours of sunlight each day',
        water: 'twice per week',
        fertilize: 'regular high nitrogen and potassium',
        bloomTime: 'summer, autumn'
      },
      votes: 99
    },

    // Orchid
    flower3: {
      name: 'Orchid',
      picture: '/images/3.jpg',
      rating: 5,
      description: 'Orchids are easily distinguished from other plants, as they share some very evident characteristics such as bilateral symmetry of the flower. Terrestrial orchids may be rhizomatous or form corms or tubers. Many terrestrial orchids do not need pseudobulbs.',
      careGuide: {
        level: 'advanced',
        temperature: '12°C',
        light: 'indirect sunlight',
        water: 'once every 7 to 10 days',
        fertilize: 'equal amounts of nitrogen, phosphorus and potassium',
        bloomTime: 'early spring, late autumn'
      },
      votes: 100
    },

    // Iris Planifolia
    flower4: {
      name: 'Iris Planifolia',
      picture: '/images/4.jpg',
      rating: 3,
      description: 'Iris planifolia has a large brown ovoid bulb (around 2 in diameter), with fleshy cylindrical white roots. It is regarded as having one of the largest flowers in the subgenus Scorpiris.',
      careGuide: {
        level: 'beginner',
        temperature: '15°C',
        light: 'bright, direct sunlight',
        water: 'every 9 days',
        fertilize: 'low nitrogen',
        bloomTime: 'summer, autumn'
      },
      votes: 42
    },

    // Myosotis (Forget-Me-Not)
    flower5: {
      name: 'Myosotis',
      picture: '/images/5.jpg',
      rating: 4,
      description: 'Myosotis is a genus of flowering plants in the family Boraginaceae. In the Northern Hemisphere, they are colloquially known as forget-me-nots or scorpion grasses.',
      careGuide: {
        level: 'intermediate',
        temperature: '15°C',
        light: 'shade-loving plant',
        water: 'every day',
        fertilize: 'balanced, all-purpose fertilizer',
        bloomTime: 'spring, summer, autumn'
      },
      votes: 48
    },

    // Quotation
    quote: {
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
    }
  });
};

module.exports = {
  data
};
