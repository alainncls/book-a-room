import {expect} from 'chai'
import {hexlify} from 'ethers/lib/utils'
import InMemoryContractFactory from '../InMemoryContractFactory';
import BookARoomService from '../../src/service/BookARoomService';

describe('BookARoomService', () => {
    let contractFactory
    let bookARoomService

    beforeEach(() => {
        contractFactory = new InMemoryContractFactory()
        bookARoomService = new BookARoomService(contractFactory)
    })

    it('should book a room', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withEmptyPlanning(roomId, hour)
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
        contractFactory.bookARoom.withFilledPlanning(userAddress, roomId, hour)
        // When
        await bookARoomService.cancelBooking(roomId, hour, () => {
        })
        // Then
        expect(contractFactory.bookARoom.rooms[roomId].planning[hour]).to.equal('0x0000000000000000000000000000000000000000')
    })

    it('should find an empty planning', async () => {
        // Given
        const roomId = 1
        contractFactory.bookARoom.withEmptyPlanning(roomId)
        // When
        const planning = await bookARoomService.getPlanning(roomId)
        // Then
        expect(planning).to.have.length(24)
        expect(planning[0]).to.equal('0x0000000000000000000000000000000000000000');
    })

    it('should get Coca Rooms', async () => {
        // Given
        const roomId = 1
        contractFactory.bookARoom.withEmptyPlanning(roomId)
        // When
        const cocaRooms = await bookARoomService.getCocaRooms()
        // Then
        expect(cocaRooms).to.have.length(10)
        expect(cocaRooms[roomId].id).to.equal(roomId);
        expect(cocaRooms[roomId].planning).to.deep.equal(Array(24).fill('0x0000000000000000000000000000000000000000'));
    })

    it('should get Pepsi Rooms', async () => {
        // Given
        const roomId = 11
        contractFactory.bookARoom.withEmptyPlanning(roomId)
        // When
        const pepsiRooms = await bookARoomService.getPepsiRooms()
        // Then
        expect(pepsiRooms).to.have.length(10)
        expect(pepsiRooms[roomId - 10].id).to.equal(roomId);
        expect(pepsiRooms[roomId - 10].planning).to.deep.equal(Array(24).fill('0x0000000000000000000000000000000000000000'));
    })
})
