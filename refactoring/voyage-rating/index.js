const { voyage, history } = require('./sampleRatingData');
const { rating } = require('./helpers');

const myRating = rating(voyage, history);

console.log(myRating);
