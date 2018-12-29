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

  switch (playFor(aPerformance).type) {
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
      throw new Error(`unknown type: ${playFor(aPerformance).type}`);
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
  if (playFor(aPerformance).type === 'comedy') result += Math.floor(aPerformance.audience / 5);
  return result;
};

// *
// *
// *
const usd = aNumber => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(aNumber);

const invoice = require('./invoice');

const totalVolumeCredits = () => {
  let result = 0;
  for (const perf of invoice[0].performances) {
    // add volume credits
    result += volumeCreditsFor(perf);
  }
  return result;
};

module.exports = {
  amountFor,
  playFor,
  volumeCreditsFor,
  usd,
  totalVolumeCredits,
};
