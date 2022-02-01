class InMemoryBookARoomContract {

    constructor(etherSigner) {
        this.etherSigner = etherSigner
        this.rooms = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}, {id: 17}, {id: 18}, {id: 19}];
    }

    getPlanning(roomId) {
        return Promise.resolve(this.rooms[roomId].planning)
    }

    bookARoom() {
        return Promise.resolve()
    }

    cancelBooking() {
        return Promise.resolve()
    }

    withEmptyPlanning(roomId) {
        this.rooms[roomId].planning = Array(24).fill('0x0000000000000000000000000000000000000000');
    }

}

export default InMemoryBookARoomContract
