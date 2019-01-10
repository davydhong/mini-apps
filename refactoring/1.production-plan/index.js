const Province = require('./Province.js');

const sampleProvinceData = () => ({
  name: 'Asia',
  producers: [{ name: 'Byzantium', cost: 10, production: 9 }, { name: 'Attalia', cost: 12, production: 10 }, { name: 'Sinope', cost: 10, production: 6 }],
  demand: 30,
  price: 20,
});

const Asia = new Province(sampleProvinceData());

console.log(Asia.shortfall);
