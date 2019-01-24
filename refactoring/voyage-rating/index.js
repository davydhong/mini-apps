const { voyage, history } = require('./sampleData');
const { rating } = require('./helpers');

const myRating = rating(voyage, history);

console.log(myRating);
