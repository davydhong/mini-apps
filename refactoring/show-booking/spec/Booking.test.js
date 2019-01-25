const { regularBookingData, premiumBookingData } = require('../sampleBookingData');
const {
  Booking, PremiumBooking, createBooking, createPremiumBooking,
} = require('../Booking');

const regularBooking = createBooking(regularBookingData.show, regularBookingData.date);
const premiumBooking = createPremiumBooking(premiumBookingData.show, premiumBookingData.date, premiumBookingData.extras);

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
