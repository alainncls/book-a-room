const BookARoom = artifacts.require('BookARoom');
const assert = require('chai').assert;
const truffleAssert = require('truffle-assertions');

contract('BookARoom', (accounts) => {
    const firstAccount = accounts[0];
    const secondAccount = accounts[1];
    const ROOM_ID = 0;
    const HOUR = 10;
    const ROOM_NAME = 'ROOM_NAME';

    let bookARoomContract;

    beforeEach('should setup a new contract instance', async () => {
        bookARoomContract = await BookARoom.new();
    });

    it('should name a room', async () => {
        await bookARoomContract.nameRoom(ROOM_ID, ROOM_NAME);

        const roomResult = await bookARoomContract.rooms(ROOM_ID);

        assert.equal(roomResult, ROOM_NAME, 'When a room is added, we should find it in the contract');
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
});