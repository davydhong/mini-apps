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
    if (voyage.zone === 'china' && hasChina(history)) result = 2;
    return Math.max(result, 0);
  }

  hasChina() {
    const { history } = this;
    history.some(v => v.zone === 'china');
  }

  voyageProfitFactor() {
    const { voyage, history } = this;
    let result = 2;
    if (voyage.zone === 'china') result += 1;
    if (voyage.zone === 'east­indies') result += 1;
    if (voyage.zone === 'china' && hasChina(history)) {
      result += 3;
      if (history.length > 10) result += 1;
      if (voyage.length > 12) result += 1;
      if (voyage.length > 18) result = 1;
    } else {
      if (history.length > 8) result += 1;
      if (voyage.length > 14) result = 1;
    }
    return result;
  }

  get value() {
    const vpf = this.voyageProfitFactor();
    const vr = this.voyageRisk();
    const chr = this.captainHistoryRisk();
    if (vpf * 3 > vr + chr * 2) return 'A';
    return 'B';
  }
}

const rating = (voyage, history) => new Rating(voyage, history).value;

module.exports = {
  rating,
};
