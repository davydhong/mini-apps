const { regularBookingData, premiumBookingData } = require('../sampleBookingData');
const { Booking, PremiumBooking } = require('../Booking');

const regularBooking = new Booking(regularBookingData.show, regularBookingData.date);
const premiumBooking = new PremiumBooking(premiumBookingData.show, premiumBookingData.date, premiumBookingData.extras);

describe('Booking - hasTalkback', () => {
  it('should', () => {
    expect(regularBooking.hasTalkBack).toBeFalsy();
  });
});

describe('PremiumBooking - hasTalkback', () => {
  it('should', () => {
    expect(premiumBooking.hasTalkBack).toBeFalsy();
  });
});
