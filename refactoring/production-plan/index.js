const Province = require('./Province.js');
const sampleProvinceData = require('./sampleProvinceData');

const Asia = new Province(sampleProvinceData());

console.log(Asia.shortfall);
