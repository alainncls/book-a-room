class InMemoryBookARoomContract {

    constructor(etherSigner) {
        this.etherSigner = etherSigner
        const planning = Array(24).fill('0x0000000000000000000000000000000000000000')
        this.rooms = [{id: 0, planning}, {id: 1, planning}, {id: 2, planning}, {id: 3, planning}, {id: 4, planning}, {id: 5, planning}, {id: 6, planning}, {id: 7, planning}, {id: 8, planning}, {id: 9, planning}, {id: 10, planning}, {id: 11, planning}, {id: 12, planning}, {id: 13, planning}, {id: 14, planning}, {id: 15, planning}, {id: 16, planning}, {id: 17, planning}, {id: 18, planning}, {id: 19, planning}];
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

}

export default InMemoryBookARoomContract
