const BookARoom = artifacts.require('BookARoom');
const assert = require('chai').assert;
const truffleAssert = require('truffle-assertions');

contract('BookARoom', (accounts) => {
    const firstAccount = accounts[0];
    const secondAccount = accounts[1];
    const ROOM_ID = 0;
    const HOUR = 10;
    const ROOM_NAME = 'ROOM_NAME';
    const NEW_ROOM_NAME = 'NEW_ROOM_NAME';

    let bookARoomContract;

    beforeEach('should setup a new contract instance', async () => {
        bookARoomContract = await BookARoom.new();
        await bookARoomContract.addRoom(ROOM_NAME);
    });

    it('should get rooms number', async () => {
        assert.equal(await bookARoomContract.getRoomsNumber(), 1, 'At first there should be only one room');
    });

    it('should add a room and emit an event', async () => {
        assert.equal(await bookARoomContract.getRoomsNumber(), 1, 'At first there should be only one room');

        const tx = await bookARoomContract.addRoom(ROOM_NAME);

        assert.equal(await bookARoomContract.getRoomsNumber(), 2, 'When a room is added, the number of rooms should be incremented');

        truffleAssert.eventEmitted(tx, 'RoomAdded', (ev) => {
            return (ev.roomName === ROOM_NAME) && (ev.roomIndex.toNumber() === 1);
        });
    });

    it('shouldn\'t be able to add a room if not the contract owner', async () => {
        await truffleAssert.reverts(bookARoomContract.addRoom(ROOM_NAME, {from: secondAccount}), 'This function is restricted to the contract\'s owner');
    });

    it('should delete a room and emit an event', async () => {
        assert.equal(await bookARoomContract.getRoomsNumber(), 1, 'At first there should be only one room');

        const tx = await bookARoomContract.deleteRoom(0);

        assert.equal(await bookARoomContract.getRoomsNumber(), 0, 'When a room is deleted, the number of rooms should be decremented');

        truffleAssert.eventEmitted(tx, 'RoomDeleted', () => {
            return true;
        });
    });

    it('shouldn\'t be able to delete a room if not the contract owner', async () => {
        await truffleAssert.reverts(bookARoomContract.deleteRoom(0, {from: secondAccount}), 'This function is restricted to the contract\'s owner');
    });

    it('shouldn\'t be able to delete a room if it doesn\'t exist', async () => {
        await truffleAssert.reverts(bookARoomContract.deleteRoom(2), 'This room doesn\'t exist');
    });

    it('should name a room and emit an event', async () => {
        const tx = await bookARoomContract.nameRoom(ROOM_ID, NEW_ROOM_NAME);

        assert.equal(await bookARoomContract.rooms(ROOM_ID), NEW_ROOM_NAME, 'When a room is renamed, we should find its new name');

        truffleAssert.eventEmitted(tx, 'RoomRenamed', (ev) => {
            return ev.roomName === NEW_ROOM_NAME;
        });
    });

    it('shouldn\'t be able to rename a room if not the contract owner', async () => {
        await truffleAssert.reverts(bookARoomContract.nameRoom(ROOM_ID, NEW_ROOM_NAME, {from: secondAccount}), 'This function is restricted to the contract\'s owner');
    });

    it('shouldn\'t be able to rename a room if it doesn\'t exist', async () => {
        await truffleAssert.reverts(bookARoomContract.nameRoom(2, NEW_ROOM_NAME), 'This room doesn\'t exist');
    });

    it('should be able to get a room\'s planning', async () => {
        const expectedPlanning=Array(24).fill('0x0000000000000000000000000000000000000000');
        const planningRoom = await bookARoomContract.getPlanning(ROOM_ID);

        assert.isNotNull(planningRoom);
        assert.deepEqual(planningRoom, expectedPlanning, 'A new room should have an empty planning');
    });

    it('shouldn\'t be able to get a room\'s planning if it doesn\'t exist', async () => {
        await truffleAssert.reverts(bookARoomContract.getPlanning(2), 'This room doesn\'t exist');
    });

    it('should book a room and emit an event', async () => {
        const tx = await bookARoomContract.bookARoom(ROOM_ID, HOUR, {from: firstAccount});
        const planningRoom0 = await bookARoomContract.getPlanning(ROOM_ID);

        assert.isNotNull(planningRoom0);
        assert.equal(planningRoom0[HOUR], firstAccount, 'After a room is booked, the booker should appear in the planning');

        truffleAssert.eventEmitted(tx, 'BookingConfirmed', (ev) => {
            return ev.booker === firstAccount && ev.hour.toNumber() === HOUR;
        });
    });

    it('shouldn\'t be able to book a room for an already booked hour', async () => {
        await bookARoomContract.bookARoom(ROOM_ID, HOUR, {from: firstAccount});

        await truffleAssert.reverts(bookARoomContract.bookARoom(ROOM_ID, HOUR, {from: secondAccount}), 'This hour is already booked');
    });

    it('shouldn\'t be able to book a room if it doesn\'t exist', async () => {
        await truffleAssert.reverts(bookARoomContract.bookARoom(2, HOUR, {from: secondAccount}), 'This room doesn\'t exist');
    });

    it('should cancel a booking and emit an event', async () => {
        await bookARoomContract.bookARoom(ROOM_ID, HOUR, {from: firstAccount});
        const tx = await bookARoomContract.cancelBooking(ROOM_ID, HOUR, {from: firstAccount});
        const planningRoom0 = await bookARoomContract.getPlanning(ROOM_ID);

        assert.isNotNull(planningRoom0);
        assert.equal(planningRoom0[HOUR], '0x0000000000000000000000000000000000000000', 'After booking is cancelled, the booker should not appear in the planning anymore');

        truffleAssert.eventEmitted(tx, 'BookingCancelled', (ev) => {
            return ev.booker === firstAccount && ev.hour.toNumber() === HOUR;
        });
    });

    it('shouldn\'t be able to cancel a booking from another user', async () => {
        await bookARoomContract.bookARoom(ROOM_ID, HOUR, {from: firstAccount});

        await truffleAssert.reverts(bookARoomContract.cancelBooking(ROOM_ID, HOUR, {from: secondAccount}), 'This is not your booking');
    });

    it('shouldn\'t be able to cancel a booking if the room doesn\'t exist', async () => {
        await truffleAssert.reverts(bookARoomContract.cancelBooking(2, HOUR, {from: secondAccount}), 'This room doesn\'t exist');
    });
});