export const checkForErrors = response => {
  if (!response.ok) {
    throw new Error('Oops, something went wrong. Try again in a few! 😁');
  } else {
    return response.json();
  }
}

export function getSingleUser(userNum) {
  return fetch(`http://localhost:3001/api/v1/customers/${userNum}`)
    .then(checkForErrors)
    .catch(err => alert('Something went wrong, please try again 🦑'))
}

export function postBookRoom(roomId, customer, date, allBookings) {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    headers: {
  	   'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       "userID": customer,
       "date": date,
       "roomNumber": Number(roomId)
     }),
  })
}

export const allCustomerDataAPI = fetch("http://localhost:3001/api/v1/customers")
  .then(checkForErrors)
  .catch(err => alert('Something went wrong, please try again later 🦑'))

export const bookingDataAPI = fetch("http://localhost:3001/api/v1/bookings")
  .then(checkForErrors)
  .catch(err => alert('Something went wrong, please try again later 🦑'))

export const roomDataAPI = fetch("http://localhost:3001/api/v1/rooms")
  .then(checkForErrors)
  .catch(err => alert('Something went wrong, please try again later 🦑'))
