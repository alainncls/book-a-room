// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract BookARoom {

    address public owner = msg.sender;

    struct Room {
        string name;
        address[24] planning;
    }

    Room[] public rooms;

    event BookingConfirmed(address indexed booker, string roomName, uint hour);
    event BookingCancelled(address indexed booker, string roomName, uint hour);
    event RoomAdded(string roomName, uint roomIndex);
    event RoomRenamed(string roomName);

    constructor() {}

    function addRoom(string memory _roomName) public isOwner {
        address[24] memory planning;
        for (uint i = 0; i < 24; i++) {
            planning[i] = address(0);
        }
        rooms.push(Room(_roomName, planning));
        emit RoomAdded(_roomName, getRoomsNumber());
    }

    function nameRoom(uint _roomId, string memory _roomName) public isOwner {
        rooms[_roomId].name = _roomName;
        emit RoomRenamed(_roomName);
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

    function getRoomsNumber() public view returns (uint) {
        return rooms.length;
    }

    modifier roomIsFree(uint _roomId, uint _hour) {
        require(rooms[_roomId].planning[_hour] == address(0), "This hour is already booked");
        _;
    }

    modifier isBooker(uint _roomId, uint _hour) {
        require(rooms[_roomId].planning[_hour] == msg.sender, "This is not your booking");
        _;
    }

    modifier isOwner() {
        require(msg.sender == owner, "This function is restricted to the contract's owner");
        _;
    }

}
