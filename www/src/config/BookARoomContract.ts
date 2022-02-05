import {ContractReceipt, ContractTransaction, Event, Signer} from 'ethers'
import {BookARoom as BookARoomContractType} from './types/ethers-contracts/BookARoom'
import {BookARoom__factory} from './types/ethers-contracts'

export type OnBookCallback = (roomId: number, hour: number) => void
export type OnCancelCallback = (roomId: number, hour: number) => void

let bookARoomJson = require('../../../blockchain/build/contracts/BookARoom.json')
let bookARoomAddress = bookARoomJson.networks['5777'].address

class BookARoomContract {
    private contract: BookARoomContractType;

    constructor(etherSigner: Signer) {
        this.contract = BookARoom__factory.connect(bookARoomAddress, etherSigner)
    }

    getRoom(roomId: number): Promise<string> {
        return this.contract.rooms(roomId)
    }

    getPlanning(roomId: number): Promise<string[]> {
        return this.contract.getPlanning(roomId)
    }

    async bookARoom(roomId: number, hour: number): Promise<boolean> {
        const transaction: ContractTransaction = await this.contract.bookARoom(roomId, hour)
        const receipt: ContractReceipt = await transaction.wait(1)
        const event: Event = receipt.events.pop()
        return !!event;
    }

    async cancelBooking(roomId: number, hour: number): Promise<boolean> {
        const transaction: ContractTransaction = await this.contract.cancelBooking(roomId, hour)
        const receipt: ContractReceipt = await transaction.wait(1)
        const event: Event = receipt.events.pop()
        return !!event;
    }

    onBook(callback: OnBookCallback) {
        this.contract.once('BookingConfirmed', (booker, roomName, hour) => {
            console.log('roomName', roomName)
            callback(roomName, hour)
        })
    }

    onCancel(callback: OnCancelCallback) {
        this.contract.once('BookingCancelled', (booker, roomName, hour) => {
            callback(roomName, hour)
        })
    }
}

export default BookARoomContract