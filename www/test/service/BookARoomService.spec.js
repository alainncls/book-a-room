import {expect} from 'chai'
import {hexlify} from 'ethers/lib/utils'
import InMemoryContractFactory from '../InMemoryContractFactory'
import BookARoomService from '../../src/service/BookARoomService'

describe('BookARoomService', () => {
    const ROOM_NAME = 'ROOM_NAME'
    let contractFactory
    let bookARoomService

    beforeEach(() => {
        contractFactory = new InMemoryContractFactory()
        bookARoomService = new BookARoomService(contractFactory)
    })

    it('should get the contract owner', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withEmptyPlanningAndName(roomId, hour, ROOM_NAME)
        // When
        const result = await bookARoomService.getOwner()
        // Then
        expect(result).to.equal(userAddress)
    })

    it('should add a room', async () => {
        // Given
        const newRoomName = "New room name"
        // When
        await bookARoomService.addRoom(newRoomName, () => {
        })
        // Then
        expect(contractFactory.bookARoom.rooms[20].name).to.equal(newRoomName)
    })

    it('should book a room', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withEmptyPlanningAndName(roomId, hour, ROOM_NAME)
        // When
        await bookARoomService.bookARoom(roomId, hour, () => {
        })
        // Then
        expect(contractFactory.bookARoom.rooms[roomId].planning[hour]).to.equal(userAddress)
    })

    it('should cancel a booking', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withFilledPlanning(userAddress, roomId, hour, ROOM_NAME, ROOM_NAME)
        // When
        await bookARoomService.cancelBooking(roomId, hour, () => {
        })
        // Then
        expect(contractFactory.bookARoom.rooms[roomId].planning[hour]).to.equal('0x0000000000000000000000000000000000000000')
    })

    it('should find an empty planning', async () => {
        // Given
        const roomId = 1
        contractFactory.bookARoom.withEmptyPlanningAndName(roomId, ROOM_NAME)
        // When
        const planning = await bookARoomService.getPlanning(roomId)
        // Then
        expect(planning).to.have.length(24)
        expect(planning[0]).to.equal('0x0000000000000000000000000000000000000000')
    })

    it('should get all rooms', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withFilledPlanning(userAddress, roomId, hour, ROOM_NAME)
        const allRooms = await bookARoomService.getAllRooms()
        // Then
        expect(allRooms[roomId].getId()).to.equal(roomId)
        expect(allRooms[roomId].getPlanning()[hour]).to.equal(userAddress)
    })

    it('should get room', async () => {
        // Given
        const roomId = 1
        contractFactory.bookARoom.withEmptyPlanningAndName(roomId, ROOM_NAME)
        // When
        const room = await bookARoomService.getRoom(roomId)
        // Then
        expect(room.id).to.equal(roomId)
        expect(room.name).to.equal(ROOM_NAME)
        expect(room.planning).to.deep.equal(Array(24).fill('0x0000000000000000000000000000000000000000'))
    })

    it('should name room', async () => {
        // Given
        const roomId = 1
        const roomName = 'ROOM_NAME'
        contractFactory.bookARoom.withEmptyPlanningAndName(roomId, ROOM_NAME)
        // When
        await bookARoomService.nameRoom(roomId, roomName)
        // Then
        const room = await bookARoomService.getRoom(roomId)
        expect(room.id).to.equal(roomId)
        expect(room.name).to.equal(roomName)
        expect(room.planning).to.deep.equal(Array(24).fill('0x0000000000000000000000000000000000000000'))
    })

    it('should get bookings', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withFilledPlanning(userAddress, roomId, hour, ROOM_NAME)
        // When
        const bookings = await bookARoomService.getBookings(userAddress)
        // Then
        expect(bookings).to.have.length(1)
        expect(bookings[0].getRoomId()).to.equal(roomId)
        expect(bookings[0].getRoomName()).to.equal(ROOM_NAME)
        expect(bookings[0].getBooker()).to.equal(userAddress)
        expect(bookings[0].getHour()).to.equal(hour)
    })
})
