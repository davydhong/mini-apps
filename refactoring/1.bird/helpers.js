class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    switch (this.type) {
      case 'EuropeanSwallow':
        throw new Error('use subclass');
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
        throw new Error('use subclass');
      case 'AfricanSwallow':
        return 402 * this.numberOfCoconuts;
      case 'NorwegianBlueParrot':
        return this.isNailed ? 0 : 10 + this.voltage / 10;
      default:
        return null;
    }
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return 'average';
  }

  get airSpeedVelocity() {
    return this.numberOfCoconuts > 2 ? 'tired' : 'average';
  }
}
class AfricanSwallow extends Bird {
  get plumage() {
    return this.numberOfCoconuts > 2 ? 'tired' : 'average';
  }

  get airSpeedVelocity() {
    return 402 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return this.voltage > 100 ? 'scorched' : 'beautiful';
  }

  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

function createBird(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return new EuropeanSwallow(bird);
    case 'AfricanSwallow':
      return new AfricanSwallow(bird);
    case 'NorwegianBlueParrot':
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

function plumages(birds) {
  return createBird(bird).plumage;
}
function speeds(birds) {
  return createBird(bird).airSpeedVelocity;
}
