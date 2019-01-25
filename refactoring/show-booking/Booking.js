class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return {}.hasOwnProperty.call(this._show, 'talkback') && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}
class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get hasTalkback() {
    return {}.hasOwnProperty.call(this._show, 'talkback');
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return {}.hasOwnProperty.call(this._extras, 'dinner') && !this.isPeakDay;
  }
}

const createBooking = (show, date) => new Booking(show, date);
const createPremiumBooking = (show, date) => new PremiumBooking(show, date);

module.exports = { Booking, PremiumBooking };
