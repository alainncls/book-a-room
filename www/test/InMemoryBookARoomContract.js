import {hexlify} from 'ethers/lib/utils'

class InMemoryBookARoomContract {

    constructor(etherSigner) {
        this.etherSigner = etherSigner
        this.rooms = [
            {id: 0, name: 'Coca 1'},
            {id: 1, name: 'Coca 2'},
            {id: 2, name: 'Coca 3'},
            {id: 3, name: 'Coca 4'},
            {id: 4, name: 'Coca 5'},
            {id: 5, name: 'Coca 6'},
            {id: 6, name: 'Coca 7'},
            {id: 7, name: 'Coca 8'},
            {id: 8, name: 'Coca 9'},
            {id: 9, name: 'Coca 10'},
            {id: 10, name: 'Pepsi 11'},
            {id: 11, name: 'Pepsi 12'},
            {id: 12, name: 'Pepsi 13'},
            {id: 13, name: 'Pepsi 14'},
            {id: 14, name: 'Pepsi 15'},
            {id: 15, name: 'Pepsi 16'},
            {id: 16, name: 'Pepsi 17'},
            {id: 17, name: 'Pepsi 18'},
            {id: 18, name: 'Pepsi 19'},
            {id: 19, name: 'Pepsi 20'}];
    }

    getRoom(roomId) {
        return Promise.resolve(this.rooms[roomId].name)
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

    nameRoom(roomId, newName) {
        this.rooms[roomId].name = newName
        return Promise.resolve()
    }

    onRename(newName, callback) {
        this.callback = () => callback(newName)
    }

    withEmptyPlanningAndName(roomId, name) {
        this.rooms[roomId].planning = Array(24).fill('0x0000000000000000000000000000000000000000')
        this.rooms[roomId].name = name
    }

    withFilledPlanning(userAddress, roomId, hour, name) {
        this.withEmptyPlanningAndName(roomId, name)
        this.rooms[roomId].planning[hour] = userAddress
    }

}

export default InMemoryBookARoomContract
