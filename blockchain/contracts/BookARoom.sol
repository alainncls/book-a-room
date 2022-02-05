// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract BookARoom {

    struct Room {
        string name;
        address[24] planning;
    }

    Room[20] public rooms;

    event BookingConfirmed(address indexed booker, string roomName, uint hour);
    event BookingCancelled(address indexed booker, string roomName, uint hour);

    constructor() {}

    function nameRoom(uint _roomId, string memory _roomName) public {
        rooms[_roomId].name = _roomName;
    }

    function getPlanning(uint _roomId) public view returns (address[24] memory){
        return rooms[_roomId].planning;
    }

    function bookARoom(uint _roomId, uint _hour) public roomIsFree(_roomId, _hour) {
        rooms[_roomId].planning[_hour] = msg.sender;
        emit BookingConfirmed(msg.sender, rooms[_roomId].name, _hour);
    }

    function cancelBooking(uint _roomId, uint _hour) public isBooker(_roomId, _hour) {
        rooms[_roomId].planning[_hour] = address(0);
        emit BookingCancelled(msg.sender, rooms[_roomId].name, _hour);
    }

    modifier roomIsFree(uint _roomId, uint _hour) {
        require(rooms[_roomId].planning[_hour] == address(0), "This hour is already booked");
        _;
    }

    modifier isBooker(uint _roomId, uint _hour) {
        require(rooms[_roomId].planning[_hour] == msg.sender, "This is not your booking");
        _;
    }

}
