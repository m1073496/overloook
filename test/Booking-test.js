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

  it('should be an instance of a Booking', function() {
    expect(bookingOne).to.be.an.instanceOf(Booking);
  });

  it('should have an ID number', function() {
    expect(bookingTwo.id).to.equal('5fwrgu4i7k55hl6uf');
  });

  it('should have a use ID associated with it', function() {
    expect(bookingThree.userID).to.equal(2);
  });

  it('should have a date associated with it', function() {
    expect(bookingOne.date).to.equal('2020/02/05');
  });

  it('should have a roomNumber associated with it',  function() {
    expect(bookingTwo.roomNumber).to.equal(18);
  });

  it('should have room service charges listed', function() {
    expect(bookingThree.roomServiceCharges).to.deep.equal([]);
  });

});
