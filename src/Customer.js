class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
  };

  findTotalSpent(allRooms, allBookings) {
    let myBookings = allBookings.filter(booking => this.id === booking.userID);
    let myRooms = myBookings.map(booking => booking.roomNumber);

    let myCosts = myRooms.reduce((total, currentRoom) => {
      let foundRoom = allRooms.find(room => room.number === currentRoom)
      total += foundRoom.costPerNight
      return total
    }, 0);

    return myCosts;
  };

};

export default Customer;
