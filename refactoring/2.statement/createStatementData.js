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
const totalVolumeCredits = data => data.performances.reduce((total, perf) => total + perf.volumeCredits, 0);

// *
// *
// *
const totalAmount = data => data.performances.reduce((total, perf) => total + perf.amount, 0);

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('subclass responsibiltiy');
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

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

  get volumeCredit() {
    return super.volumeCredit + Math.floor(this.performance.audience / 5);
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
