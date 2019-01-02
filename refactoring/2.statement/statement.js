const {
  amountFor, playFor, usd, volumeCreditsFor, totalVolumeCredits, totalAmount,
} = require('./helpers');

const enrichPerformance = (aPerformance) => {
  const result = { ...aPerformance };
  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  console.log(result);
  return result;
};

const renderPlainText = (data) => {
  let result = `Statement for ${data.customer}\n`;

  for (const perf of data.performances) {
    // print line for this order
    result += `${perf.play.name}:${usd(perf.amount / 100)}(${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
};

const statement = (invoice) => {
  const statementData = {};
  statementData.customer = invoice[0].customer;
  statementData.performances = invoice[0].performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return renderPlainText(statementData);
};
module.exports = statement;
