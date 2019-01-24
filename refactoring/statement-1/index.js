const statement = require('./statement');
const invoices = require('./invoices');
const plays = require('./plays');

statement(invoices, plays);

console.log(statement(invoices, plays));
