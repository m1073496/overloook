import {
  expect
} from 'chai';

import Customer from '../src/Customer.js';
import {
  customers
} from '../src/data/test-data.js';

describe('Customer', function() {

  let customerOne, customerTwo, customerThree;

  beforeEach(function() {
    customerOne = new Customer(customers[0]);
    customerTwo = new Customer(customers[1]);
    customerThree = new Customer(customers[2]);
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
    expect(customerOne.findTotalSpent()).to.equal(172.09);
    expect(customerTwo.findTotalSpent()).to.equal(635.93);
  });

});
