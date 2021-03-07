import {
  expect
} from 'chai';

import Booking from '../src/Booking.js';
import {
  bookings
} from '../src/data/test-data.js';

describe('Booking', function() {

  let bookingOne, bookingTwo, bookingThree;

  beforeEach(function() {
    bookingOne = new Booking(bookings[0]);
    bookingTwo = new Booking(bookings[1]);
    bookingThree = new Booking(bookings[2]);
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of a Room', function() {
    expect(bookingOne).to.be.an.instanceOf(Booking);
  });

});
