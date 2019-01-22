function plumages(birds) {
  return new Map(birds.map(b => [b.name, plumage(b)]));
}
function speeds(birds) {
  return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]));
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    switch (this.type) {
      case 'EuropeanSwallow':
        return 'average';
      case 'AfricanSwallow':
        return this.numberOfCoconuts > 2 ? 'tired' : 'average';
      case 'NorwegianBlueParrot':
        return this.voltage > 100 ? 'scorched' : 'beautiful';
      default:
        return 'unknown';
    }
  }

  get airSpeedVelocity() {
    switch (this.type) {
      case 'EuropeanSwallow':
        return 35;
      case 'AfricanSwallow':
        return 402 * this.numberOfCoconuts;
      case 'NorwegianBlueParrot':
        return this.isNailed ? 0 : 10 + this.voltage / 10;
      default:
        return null;
    }
  }
}
