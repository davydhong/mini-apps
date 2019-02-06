const { regularBookingData, premiumBookingData } = require('./sampleBookingData');
const { Booking, createBooking, createPremiumBooking } = require('./Booking');

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

describe('Booking - basePrice', () => {
  it('should', () => {
    expect(regularBooking.basePrice).toEqual(5);
  });
});

describe('PremiumBooking - basePrice', () => {
  it('should', () => {
    expect(premiumBooking.basePrice).toEqual(20);
  });
});

describe('Booking - hasDinner', () => {
  it('should', () => {
    expect(regularBooking.hasDinner).toBeFalsy();
  });
});

describe('PremiumBooking - hasDinner', () => {
  it('should', () => {
    expect(premiumBooking.hasDinner).toBeFalsy();
  });
});
