// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import {
  allCustomerDataAPI,
  bookingDataAPI,
  roomDataAPI
} from './API.js';

import Customer from './Customer';
import Room from './Room';
import Booking from './Booking';

function fetchData() {
  Promise.all([allCustomerDataAPI, bookingDataAPI, roomDataAPI])
    .then((values) => {
      renderData(values[0], values[1], values[2])
    })
}

function renderData(customersData, bookingsData, roomsData) {
  console.log(customersData.customers[12], bookingsData, roomsData)
}





















window.addEventListener('load', fetchData);
