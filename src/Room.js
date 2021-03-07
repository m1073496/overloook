class Room {
  constructor(roomData) {
    this.number = roomData.number;
    this.roomType = roomData.roomType;
    this.bidet = roomData.bidet;
    this.bedSize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNight;
  };

  findAvailability(date, allBookings) {
    let thisRoomBookings = allBookings.filter(booking => booking.roomNumber === this.number);
    let roomBookingDate = thisRoomBookings.find(booking => booking.date === date);
    if(roomBookingDate) {
      return false;
    } else {
      return true;
    };
  };

};

export default Room;
