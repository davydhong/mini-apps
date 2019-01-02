const plays = require('./plays');

// *
// *
// *
const playFor = aPerformance => plays[aPerformance.playID];

// *
// *
// *
const amountFor = (aPerformance) => {
  let result = 0;
  console.log(aPerformance.play.type);
  switch (aPerformance.play.type) {
    case 'tragedy':
      result = 40000;

      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;

    case 'comedy':
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;

    default:
      throw new Error(`unknown type: ${aPerformance.play.type}`);
  }
  return result;
};

// *
// *
// *
const volumeCreditsFor = (aPerformance) => {
  let result = 0;

  // add volume credits
  result += Math.max(aPerformance.audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if (aPerformance.play.type === 'comedy') result += Math.floor(aPerformance.audience / 5);
  return result;
};

// *
// *
// *
const usd = aNumber => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(aNumber);

const invoice = require('./invoices');

// *
// *
// *
const totalVolumeCredits = (data) => {
  let result = 0;
  for (const perf of data.performances) {
    // add volume credits
    result += perf.volumeCredits;
  }
  return result;
};

// *
// *
// *
const totalAmount = (data) => {
  let result = 0;
  for (const perf of data.performances) {
    result += perf.amount;
  }
  return result;
};

const enrichPerformance = (aPerformance) => {
  const result = { ...aPerformance };
  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  console.log(result);
  return result;
};

const createStatementData = (invoice) => {
  const statementData = {};
  statementData.customer = invoice[0].customer;
  statementData.performances = invoice[0].performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
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

module.exports = { renderPlainText, createStatementData };
