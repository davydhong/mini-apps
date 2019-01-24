class Customer {
  constructor(data) {
    this._name = data.name;
    this._billingPlan = data.billingPlan;
    this._paymentHistory = data.paymentHistory;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    return this._billingPlan;
  }

  set billingPlan(arg) {
    this._billingPlan = arg;
  }

  get paymentHistory() {
    return this._paymentHistory;
  }
}

module.exports = Customer;
