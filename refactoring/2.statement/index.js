const statement = require('./statement');
const invoices = require('./invoices');

console.log(statement(invoices));
// Statement for BigCo
// Hamlet:$650.00(55 seats)
// AsYouLikeIt:$580.00(35 seats)
// Othello:$500.00(40 seats)
// Amount owed is $1,730.00
// You earned 40 credits
