const plays = require('./plays');

const playFor = aPerformance => plays[aPerformance.playID];

module.exports = playFor;