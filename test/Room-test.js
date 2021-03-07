import {
  expect
} from 'chai';

import Room from '../src/Room.js';
import {
  rooms
} from '../src/data/test-data.js';

describe('Room', function() {

  let roomOne, roomTwo, roomThree;

  beforeEach(function() {
    roomOne = new Room (rooms[0]);
    roomTwo = new Room(rooms[1]);
    roomThree = new Room(rooms[2]);
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of a Room', function() {
    expect(roomOne).to.be.an.instanceOf(Room);
  });



















});
