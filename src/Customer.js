class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
  };

  findMyBookings(allBookings) {
    return allBookings.filter(booking => this.id === booking.userID);
  };

  findMyRooms(allRooms, allBookings) {
    let myBookings = this.findMyBookings(allBookings);

    return myBookings.reduce((rooms, currentBooking) => {
      let foundRoom = allRooms.find(room => room.number === currentBooking.roomNumber);
      rooms.push(foundRoom);
      return rooms
    }, []);
  };

  findTotalSpent(allRooms, allBookings) {
    let myRooms = this.findMyRooms(allRooms, allBookings);

    let myCosts = myRooms.reduce((total, currentRoom) => {
      total += currentRoom.costPerNight
      return total
    }, 0);

    return myCosts;
  };

};

export default Customer;
