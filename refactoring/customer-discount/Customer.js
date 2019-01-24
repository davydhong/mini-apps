const assert = require('assert');

class Customer {
  constructor(discountRate) {
    this._discountRate = discountRate;
  }

  set discountRate(aNumber) {
    assert(aNumber === null || aNumber >= 0);
    this._discountRate = aNumber;
  }

  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;

    assert(this.discountRate >= 0);
    return aNumber(this.discountRate * aNumber);
  }
}

module.exports = Customer;
