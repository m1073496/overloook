import './css/base.scss';

import './images/turing-logo.png';
import './images/userIcon.png';

import {
  // allCustomerDataAPI,
  getSingleUser,
  singleCustomerDataAPI,
  bookingDataAPI,
  roomDataAPI
} from './API.js';

import Customer from './Customer';
import Room from './Room';
import Booking from './Booking';

let thisCustomer;
let allBookings;
let allRooms;
let dateSelected;

const userGreeting = document.querySelector('.user-greeting');
const totalSpent = document.querySelector('.total-spent');
const bookingsList = document.querySelector('.bookings-list');
const bookNewRoomButton = document.getElementById('book-new-room');
const datePicker = document.getElementById('date');
const datePickerLabel = document.querySelector('.date-picker');
const findRoomsButton = document.getElementById('find-rooms');
const dropDown = document.querySelector('.dropdown');
const homeButton = document.getElementById('home-button');
const logOutButton = document.getElementById('log-out');
const userDash = document.getElementById('user-dashboard');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login');
const loginView = document.querySelector('.container');


function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function reset(element) {
  element.innerHTML = '';
}

function findUserName() {
  let possibleUsernames = [];
  for (let i = 1; i < 51; i++) {
    possibleUsernames.push(`customer${i}`);
  };

  let foundUserName = possibleUsernames.find(username => username === userNameInput.value);

  if (foundUserName && passwordInput.value === 'overlook2021') {
    let customerNum;

    if (foundUserName.length === 9) {
      customerNum = foundUserName.charAt(8);
    } else {
      customerNum = foundUserName.charAt(8) + foundUserName.charAt(9);
    };
    return customerNum;
  } else {
    alert("Incorrect username/password combo, please try again 🦑")
  };
};

function getUser() {
  let customerNum = findUserName();

  if (customerNum) {
    userNameInput.value = "";
    passwordInput.value = "";
    Promise.all([getSingleUser(customerNum), bookingDataAPI, roomDataAPI])
      .then((values) => {
        createInstances(values);
        login();
      });
    };
};

function createInstances(data) {
  thisCustomer = new Customer(data[0]);
  allBookings = data[1].bookings.map(booking => new Booking(booking));
  allRooms = data[2].rooms.map(room => new Room(room));
};

function login() {
  hide(loginView);
  show(userDash);
  renderUserDashboard();
};

function renderUserDashboard() {
  console.log(allBookings)
  hide(dropDown);
  reset(bookingsList);
  userGreeting.innerText = thisCustomer.name;
  totalSpent.innerText = thisCustomer.findTotalSpent(allRooms, allBookings).toFixed(2);
  thisCustomer.findMyBookings(allBookings).forEach(booking => {
    let modifiedDate = booking.date.split('/').sort((a, b) => a - b).join('/');

    let roomInfoForBooking = allRooms.find(room => room.number === booking.roomNumber);
    bookingsList.innerHTML += `
      <section class="item">
        <h3>${modifiedDate}</h3>
        <p class="room-num">Room ${booking.roomNumber}</p>
        <div class="line"></div>
        <p class="room-num">A ${roomInfoForBooking.roomType} with ${roomInfoForBooking.numBeds} ${roomInfoForBooking.bedSize} bed(s), starting at $${roomInfoForBooking.costPerNight} / night.</p>
      </section>
    `;
  })
}

function bookNewRoom() {
  hide(bookNewRoomButton);
  show(datePicker);
  show(datePickerLabel);
  show(findRoomsButton);
}

function searchForRooms(date) {
  reset(bookingsList);
  show(dropDown);

  let modifiedDate = date.replaceAll("-", "/");
  let roomsAvailable = allRooms.filter(room => room.findAvailability(modifiedDate, allBookings) === true);

  if(roomsAvailable.length >= 1) {
    displayRoomsAvailable(roomsAvailable);
  } else {
    fiercelyApologize();
  }
};

function displayRoomsAvailable(roomsAvailable) {
  roomsAvailable.forEach(room => {
    let newBooking = document.createElement('article');
    bookingsList.appendChild(newBooking);

    newBooking.innerHTML += `
      <section class="item-avail">
        <h3>Room ${room.number}</h3>
        <div class="line"></div>
        <p>Room Type: ${room.roomType}</p>
        <p>Beds: ${room.numBeds}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Bidet: ${findBidetMessage(room)}</p>
        <p>Nightly Rate: $${room.costPerNight}</p>
        <button class="book-now-button" id="${room.number}">Book Now!</button>
      </section>
    `;

    newBooking.addEventListener('click', function(e) {
      let roomId = e.target.id;
      bookRoom(roomId);
    });
  });
};

function findBidetMessage(room) {
  let bidetMessage;
  if (room.bidet) {
    bidetMessage = 'available';
  } else {
    bidetMessage = 'not available';
  };
  return bidetMessage;
};

function fiercelyApologize(whatWentWrong) {
  let message;

  if (whatWentWrong === 'no rooms') {
    message = `the room type you've selected`
  } else {
    message =  `the date you've selected`
  };

  bookingsList.innerHTML += `
    <div class="item">
      <h3>We're terribly sorry, but no rooms are available for ${message}. Please try another search!</h3>
    </div>
  `;
};

function filterRooms(roomType) {
  reset(bookingsList);

  let modifiedDate = dateSelected.replaceAll("-", "/");
  let roomsAvailable = allRooms.filter(room => room.findAvailability(modifiedDate, allBookings) === true);


  let filteredRooms = roomsAvailable.filter(room => room.roomType === roomType && room.date !== dateSelected);
  if (filteredRooms.length >= 1) {
    displayRoomsAvailable(filteredRooms);
  } else {
    fiercelyApologize('no rooms');
  }
};

function bookRoom(roomId) {
  let date = dateSelected.replaceAll('-', '/');

  fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    headers: {
  	   'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       "userID": thisCustomer.id,
       "date": date,
       "roomNumber": Number(roomId)
     }),
  })
    .then(response => response.json())
    .then(json => {
      allBookings.unshift(new Booking(json.newBooking));
      renderUserDashboard();
    })
    .catch(err => alert('oh no'));
};


















loginButton.addEventListener('click', getUser);

bookNewRoomButton.addEventListener('click', bookNewRoom);

findRoomsButton.addEventListener('click', function() {
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
});

homeButton.addEventListener('click', renderUserDashboard);

logOutButton.addEventListener('click', function() {
  hide(userDash);
  show(loginView);
})
