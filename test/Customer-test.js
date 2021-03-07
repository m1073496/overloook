import {
  expect
} from 'chai';

import Customer from '../src/Customer.js';
import Booking from '../src/Booking.js';
import Room from '../src/Room.js';

import {
  customers,
  rooms,
  bookings
} from '../src/data/test-data.js';

describe('Customer', function() {

  let customerOne, customerTwo, customerThree, roomsRepo, bookingsRepo;

  beforeEach(function() {
    customerOne = new Customer(customers[0]);
    customerTwo = new Customer(customers[1]);
    customerThree = new Customer(customers[2]);
    roomsRepo = rooms.map(room => new Room(room));
    bookingsRepo = bookings.map(booking => new Booking(booking));
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of a Customer', function() {
    expect(customerOne).to.be.an.instanceOf(Customer);
  });

  it('should have an ID number', function() {
    expect(customerOne.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(customerTwo.name).to.equal('Rocio Schuster');
  });

  it('should know total amount spent on rooms', function() {
    expect(customerOne.findTotalSpent(roomsRepo, bookingsRepo)).to.equal(172.09);
    expect(customerTwo.findTotalSpent(roomsRepo, bookingsRepo)).to.equal(871.08);
  });

});
