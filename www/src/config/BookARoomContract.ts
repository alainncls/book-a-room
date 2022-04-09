import {BigNumber, ContractReceipt, ContractTransaction, Event, Signer} from 'ethers'
import {BookARoom as BookARoomContractType} from './types/ethers-contracts/BookARoom'
import {BookARoom__factory} from './types/ethers-contracts'

export type OnBookCallback = (roomName: string, hour: number) => void
export type OnCancelCallback = (roomName: string, hour: number) => void
export type OnAddCallback = (roomName: string, roomIndex: number) => void
export type OnRenameCallback = (roomName: string) => void

const bookARoomJson = require('../../../blockchain/build/contracts/BookARoom.json')
const bookARoomAddress = bookARoomJson.networks['5777'].address

class BookARoomContract {
    private contract: BookARoomContractType;

    constructor(etherSigner: Signer) {
        this.contract = BookARoom__factory.connect(bookARoomAddress, etherSigner)
    }

    getOwner(): Promise<string> {
        return this.contract.owner()
    }

    getRoomsNumber() {
        return this.contract.roomsNumber().then(value => value.toNumber())
    }

    async addRoom(name: string): Promise<boolean> {
        const transaction: ContractTransaction = await this.contract.addRoom(name)
        const receipt: ContractReceipt = await transaction.wait(1)
        const event: Event = receipt.events.pop()
        return !!event;
    }

    async nameRoom(roomId: number, newName: string): Promise<boolean> {
        const transaction: ContractTransaction = await this.contract.nameRoom(roomId, newName)
        const receipt: ContractReceipt = await transaction.wait(1)
        const event: Event = receipt.events.pop()
        return !!event;
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
        this.contract.once('BookingConfirmed', (_booker, roomName, hour) => {
            callback(roomName, hour)
        })
    }

    onCancel(callback: OnCancelCallback) {
        this.contract.once('BookingCancelled', (_booker, roomName, hour) => {
            callback(roomName, hour)
        })
    }

    onAdd(callback: OnAddCallback) {
        this.contract.once('RoomAdded', (roomName, roomIndex) => {
            callback(roomName, roomIndex)
        })
    }

    onRename(callback: OnRenameCallback) {
        this.contract.once('RoomRenamed', (roomName) => {
            callback(roomName)
        })
    }
}

export default BookARoomContract