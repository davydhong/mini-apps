const plays = require('./plays');

// *
// *
// *
const playFor = aPerformance => plays[aPerformance.playID];

// *
// * MOVED TO PERFORMANCE CALCULATOR
// *
// // const volumeCreditsFor = (aPerformance) => {
// // let result = 0;

//   // add volume credits
//   // result += Math.max(aPerformance.audience - 30, 0);
//   // add extra credit for every ten comedy attendees
//   // if (aPerformance.play.type === 'comedy') result += Math.floor(aPerformance.audience / 5);
//   // return result;
//   //};

// const invoice = require('./invoices');

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

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('subclass responsibiltiy');
  }

  get volumeCredits() {
    let result = 0;

    // add volume credits
    result += Math.max(this.performance.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if (this.play.type === 'comedy') result += Math.floor(this.performance.audience / 5);
    return result;
  }
}

// *
// * No longer needed - moved to PerformanceCalculator
// *
// //const amountFor = aPerformance => new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;

    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
};

const enrichPerformance = (aPerformance) => {
  const result = { ...aPerformance };
  const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
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

module.exports = { createStatementData };
