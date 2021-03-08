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
let dateSelected;

let userGreeting = document.querySelector('.user-greeting');
let totalSpent = document.querySelector('.total-spent');
let bookingsList = document.querySelector('.bookings-list');
let bookNewRoomButton = document.getElementById('book-new-room');
let datePicker = document.getElementById('date');
let datePickerLabel = document.querySelector('.date-picker');
let dropDown = document.querySelector('.dropdown');


function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function reset(element) {
  element.innerHTML = '';
}

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

function bookNewRoom() {
  hide(bookNewRoomButton);
  show(datePicker);
  show(datePickerLabel);
}

function searchForRooms(date) {
  reset(bookingsList);
  show(dropDown);

  let roomsAvailable = allRooms.map(room => {
    if(room.findAvailability(date, allBookings) === true) {
      return room
    }
  });

  if(roomsAvailable.length >= 1) {
    displayRoomsAvailable(roomsAvailable);
  } else {
    fiercelyApologize();
  }
};

function displayRoomsAvailable(roomsAvailable) {
  roomsAvailable.forEach(room => {
    let bidetMessage;
    if (room.bidet) {
      bidetMessage = 'available';
    } else {
      bidetMessage = 'not available';
    };

    bookingsList.innerHTML += `
      <section class="item">
        <h3>Room ${room.number}</h3>
        <p>Room Type: ${room.roomType}</p>
        <p>Beds: ${room.numBeds}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Bidet: ${bidetMessage}</p>
        <p>Nightly Rate: $${room.costPerNight}</p>
        <button class="book-now-button" id="room-${room.number}">Book Now!</button>
      </section>
    `;
  });
  
  bookingsList.addEventListener('click', function(e) {
    let roomId = e.target.id;
    bookRoom(roomId);
  });
};

function fiercelyApologize(whatWentWrong) {
  let message;
  if (whatWentWrong === 'no rooms') {
    message = `the room type you've selected`
  } else {
    message =  `the date you've selected`
  }
  bookingsList.innerHTML += `
    <h3>We're terribly sorry, but no rooms are available for ${message}. Please try another search!</h3>
  `;
};

function filterRooms(roomType) {
  reset(bookingsList);
  let filteredRooms = allRooms.filter(room => room.roomType === roomType && room.date !== dateSelected);
  if (filteredRooms.length >= 1) {
    displayRoomsAvailable(filteredRooms);
  } else {
    fiercelyApologize('no rooms');
  }
}

function bookRoom(roomId) {
  console.log(roomId)
}





















window.addEventListener('load', fetchData);

bookNewRoomButton.addEventListener('click', bookNewRoom);

datePicker.addEventListener('keypress', function() {
    dateSelected = datePicker.value;
    searchForRooms(dateSelected);
});

dropDown.addEventListener('click', function(e) {
  let roomType;
  switch (e.target.value) {
    case 'Single Room':
      roomType = 'single room';
      break;
    case 'Suite':
      roomType = 'suite';
      break;
    case 'Junior Suite':
      roomType = 'junior suite';
      break;
    case 'Residential Suite':
      roomType = 'residential suite';
      break;
  }
  filterRooms(roomType);
})
