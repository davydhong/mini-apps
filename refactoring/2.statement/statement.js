const {
  amountFor, playFor, volumeCreditsFor, usd, totalVolumeCredits,
} = require('./helpers');

const statement = (invoice) => {
  let totalAmount = 0;
  let result = `Statement for ${invoice[0].customer}\n`;

  for (const perf of invoice[0].performances) {
    // print line for this order
    result += `${playFor(perf).name}:${usd(amountFor(perf) / 100)}(${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }

  result += `Amount owed is ${usd(totalAmount / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
};

module.exports = statement;
