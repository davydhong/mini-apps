class TurnTracker {
  constructor() {
    this.isO = true;
  }

  get player() {
    return this.isO ? 'O' : 'X';
  }

  reset() {
    this.isO = true;
  }

  change() {
    this.isO = !this.isO;
  }
}

module.exports = TurnTracker;
