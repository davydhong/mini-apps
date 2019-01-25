class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._premiumDelegate ? this._premiumDelegate.hasTalkback : {}.hasOwnProperty.call(this._show, 'talkback') && !this.isPeakDay;
  }

  get basePrice() {
    return this._premiumDelegate ? this._premiumDelegate.basePrice : this._privateBasePrice;
  }

  get _privateBasePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }

  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }

  get hasDinner() {
    return this._premiumDelegate ? this._premiumDelegate.hasDinner : undefined;
  }
}
class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }

  get basePrice() {
    return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return {}.hasOwnProperty.call(this._extras, 'dinner') && !this.isPeakDay;
  }
}

const createBooking = (show, date) => new Booking(show, date);
const createPremiumBooking = (show, date, extras) => {
  const result = new PremiumBooking(show, date, extras);
  result._bePremium(extras);
  return result;
};

module.exports = {
  Booking,
  PremiumBooking,
  createBooking,
  createPremiumBooking,
};
