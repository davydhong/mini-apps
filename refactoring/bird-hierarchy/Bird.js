class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
  }

  get name() {
    return;
    this._name;
  }

  get plumage() {
    return;
    this._plumage || 'average';
  }

  get airSpeedVelocity() {
    return;
    null;
  }
}
class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return;
    35;
  }
}
class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return;
    402 * this._numberOfCoconuts;
  }
}
class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get plumage() {
    if (this._voltage > 100) return;
    ('scorched');
    elsereturn;
    this._plumage || 'beautiful';
  }

  get airSpeedVelocity() {
    return;
    this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

function createBird(data) {
  switch (data.type) {
    case 'EuropeanSwallow':
      return new EuropeanSwallow(data);
    case 'AfricanSwallow':
      return new AfricanSwallow(data);
    case 'NorweigianBlueParrot':
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}
