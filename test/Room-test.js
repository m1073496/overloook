import {
  expect
} from 'chai';

import Room from '../src/Room.js';
import Booking from "../src/Booking.js"

import {
  rooms,
  bookings
} from '../src/data/test-data.js';

describe('Room', function() {

  let roomOne, roomTwo, roomThree, allBookings;

  beforeEach(function() {
    roomOne = new Room (rooms[0]);
    roomTwo = new Room(rooms[1]);
    roomThree = new Room(rooms[2]);
    allBookings = bookings.map(booking => new Booking(booking));
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of a Room', function() {
    expect(roomOne).to.be.an.instanceOf(Room);
  });

  it('should have a room number', function() {
    expect(roomOne.number).to.equal(12);
  });

  it('should have a room type', function() {
    expect(roomOne.roomType).to.equal('single room');
    expect(roomTwo.roomType).to.equal('junior suite');
  });

  it('should have a bidet status', function() {
    expect(roomThree.bidet).to.equal(false);
  });

  it('should have a bed size listed', function() {
    expect(roomOne.bedSize).to.equal('twin');
    expect(roomTwo.bedSize).to.equal('king');
  })

  it('should have a number of beds listed', function() {
    expect(roomOne.numBeds).to.equal(2);
    expect(roomThree.numBeds).to.equal(1);
  });

  it('should have a cost per night listed', function() {
    expect(roomTwo.costPerNight).to.equal(496.41);
    expect(roomThree.costPerNight).to.equal(261.26);
  });

  it('should find availabiltiy status', function() {
    expect(roomOne.findAvailability("2020/02/05", allBookings)).to.equal(false);
    expect(roomTwo.findAvailability("2021/06/31", allBookings)).to.equal(true);
  });

});
