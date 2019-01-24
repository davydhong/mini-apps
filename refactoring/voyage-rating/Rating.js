class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  voyageRisk() {
    const { voyage } = this;
    let result = 1;
    if (voyage.length > 4) result += 2;
    if (voyage.length > 8) result += voyage.length - 8;
    if (['china', 'east­indies'].includes(voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  captainHistoryRisk() {
    const { voyage, history } = this;
    let result = 1;
    if (history.length < 5) result += 4;
    result += history.filter(v => v.profit < 0).length;
    return Math.max(result, 0);
  }

  hasChina() {
    const { history } = this;
    history.some(v => v.zone === 'china');
  }

  voyageProfitFactor() {
    const { voyage } = this;
    let result = 2;
    if (voyage.zone === 'china') result += 1;
    if (voyage.zone === 'east­indies') result += 1;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += this.historyLengthFactor;
    result -= this.voyageLengthFactor;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }

  get voyageLengthFactor() {
    return this.history.length > 14 ? 1 : 0;
  }

  get value() {
    const vpf = this.voyageProfitFactor();
    const vr = this.voyageRisk();
    const chr = this.captainHistoryRisk();
    if (vpf * 3 > vr + chr * 2) return 'A';
    return 'B';
  }
}

class ExperiencedChinaRating extends Rating {
  captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }

  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += this.historyLengthFactor;
    result += this.voyageLengthFactor;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }

  get voyageLengthFactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }
}

const createRating = (voyage, history) => {
  if (voyage.zone === 'china' && history.some(v => v.zone === 'china')) return new ExperiencedChinaRating(voyage, history);
  return new Rating(voyage, history);
};

const rating = (voyage, history) => createRating(voyage, history).value;

module.exports = {
  rating,
};
