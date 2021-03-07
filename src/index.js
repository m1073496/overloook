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

let allCustomers;
let allBookings;
let allRooms;

let userGreeting = document.querySelector('.user-greeting');
let totalSpent = document.querySelector('.total-spent');
let bookingsList = document.querySelector('.bookings');





function fetchData() {
  Promise.all([allCustomerDataAPI, bookingDataAPI, roomDataAPI])
    .then((values) => {
      createInstances(values);
      renderUserDashboard()
    })
}

function createInstances(data) {
  allCustomers = data[0].customers.map(customer => new Customer(customer));
  allBookings = data[1].bookings.map(booking => new Booking(booking));
  allRooms = data[2].rooms.map(room => new Room(room));
}

function renderUserDashboard() {
  console.log(allCustomers[3].findMyBookings(allBookings));
  userGreeting.innerText = allCustomers[3].name;
  totalSpent.innerText = allCustomers[3].findTotalSpent(allRooms, allBookings).toFixed(2);
  allCustomers[3].findMyBookings(allBookings).forEach(booking => {
    bookingsList.innerHTML += `
      <section class="item">Date: ${booking.date} Room Number: ${booking.roomNumber}</section>
    `;
  })
}





















window.addEventListener('load', fetchData);
