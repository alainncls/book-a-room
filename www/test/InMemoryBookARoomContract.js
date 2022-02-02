import {hexlify} from 'ethers/lib/utils'

class InMemoryBookARoomContract {

    constructor(etherSigner) {
        this.etherSigner = etherSigner
        this.rooms = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}, {id: 17}, {id: 18}, {id: 19}];
    }

    getPlanning(roomId) {
        return Promise.resolve(this.rooms[roomId].planning)
    }

    bookARoom(roomId, hour) {
        this.rooms[roomId].planning[hour] = hexlify(10)
        return Promise.resolve()
    }

    onBook(roomId, hour, callback) {
        this.callback = () => callback(roomId, hour)
    }

    cancelBooking(roomId, hour) {
        this.rooms[roomId].planning[hour] = '0x0000000000000000000000000000000000000000'
        return Promise.resolve()
    }

    onCancel(roomId, hour, callback) {
        this.callback = () => callback(roomId, hour)
    }

    withEmptyPlanning(roomId) {
        this.rooms[roomId].planning = Array(24).fill('0x0000000000000000000000000000000000000000');
    }

    withFilledPlanning(userAddress, roomId, hour) {
        this.withEmptyPlanning(roomId)
        this.rooms[roomId].planning[hour] = userAddress;
    }

}

export default InMemoryBookARoomContract
