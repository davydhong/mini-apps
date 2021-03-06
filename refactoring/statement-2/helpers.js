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

// const invoice = require('./invoices');

// *
const totalVolumeCredits = data => data.performances.reduce((total, perf) => total + perf.volumeCredits, 0);

// *
const totalAmount = data => data.performances.reduce((total, perf) => total + perf.amount, 0);

module.exports = {
  amountFor,
  playFor,
  volumeCreditsFor,
  usd,
  totalVolumeCredits,
  totalAmount,
};
