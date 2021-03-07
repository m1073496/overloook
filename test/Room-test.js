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
    roomOne = rooms[0];
    roomTwo = rooms[1];
    roomThree = rooms[2];
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });



















});
