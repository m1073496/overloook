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

  it('should find all bookings for a particular user', function() {
    expect(customerTwo.findMyBookings(bookingsRepo)).to.deep.equal([
      {
       "id": "5fwrgu4i7k55hl6uf",
       "userID": 2,
       "date": "2020/01/09",
       "roomNumber": 18,
       "roomServiceCharges": []
      },
      {
       "id": "5fwrgu4i7k55hl6uy",
       "userID": 2,
       "date": "2020/01/24",
       "roomNumber": 19,
       "roomServiceCharges": []
     }
   ]);

    expect(customerThree.findMyBookings(bookingsRepo)).to.deep.equal([
      {
       "id": "5fwrgu4i7k55hl6tl",
       "userID": 3,
       "date": "2020/01/10",
       "roomNumber": 8,
       "roomServiceCharges": []
      }
    ]);
  });

  it('should find all rooms booked for a particular user', function() {
    expect(customerOne.findMyRooms(roomsRepo, bookingsRepo)).to.deep.equal([
      {
       "number": 12,
       "roomType": "single room",
       "bidet": false,
       "bedSize": "twin",
       "numBeds": 2,
       "costPerNight": 172.09
     }
    ]);

    expect(customerTwo.findMyRooms(roomsRepo, bookingsRepo)).to.deep.equal([
      {
         "number": 18,
         "roomType": "junior suite",
         "bidet": false,
         "bedSize": "king",
         "numBeds": 2,
         "costPerNight": 496.41
       },
       {
        "number": 19,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 374.67
       }
    ]);
  });

  it('should know total amount spent on rooms', function() {
    expect(customerOne.findTotalSpent(roomsRepo, bookingsRepo)).to.equal(172.09);
    expect(customerTwo.findTotalSpent(roomsRepo, bookingsRepo)).to.equal(871.08);
  });

});
