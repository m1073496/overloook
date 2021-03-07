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



});
