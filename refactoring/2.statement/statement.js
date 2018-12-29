const {
  amountFor, playFor, volumeCreditsFor, format,
} = require('./helpers');

const statement = (invoice) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice[0].customer}\n`;
  for (const perf of invoice[0].performances) {
    // add volume credits
    volumeCredits += volumeCreditsFor(perf);
    // print line for this order
    result += `${playFor(perf).name}:${format(amountFor(perf) / 100)}(${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
};

module.exports = statement;
