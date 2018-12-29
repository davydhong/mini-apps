const amountFor = require('./amountFor');

const playFor = require('./playFor');

const statement = (invoice, plays) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice[0].customer}\n`;
  const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format;
  for (const perf of invoice[0].performances) {
    const play = playFor(perf);
    const thisAmount = amountFor(perf, play);

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5);
    // print line for this order
    result += `${play.name}:${format(thisAmount / 100)}(${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
};

module.exports = statement;
