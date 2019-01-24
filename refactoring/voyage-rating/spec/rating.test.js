const assert = require('assert');
const { voyage, history } = require('../sampleRatingData');

const { rating } = require('../helpers');

describe('Rating', () => {
  beforeEach(() => {
    myRating = rating(voyage, history);
  });
  it('rating', () => {
    expect(myRating).toBe('B');
  });
});
