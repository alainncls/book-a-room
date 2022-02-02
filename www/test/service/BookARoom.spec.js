import {expect} from 'chai'
import {hexlify} from 'ethers/lib/utils'
import InMemoryContractFactory from "../InMemoryContractFactory";
import BookARoom from "../../src/service/BookARoom";

describe('BookARoom', () => {
    let contractFactory
    let bookARoom

    beforeEach(() => {
        contractFactory = new InMemoryContractFactory()
        bookARoom = new BookARoom(contractFactory)
    })

    it('should book a room', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withEmptyPlanning(roomId, hour)
        // When
        await bookARoom.bookARoom(roomId, hour, () => {
        })
        // Then
        expect(contractFactory.bookARoom.rooms[roomId].planning[hour]).to.equal(userAddress)
    })
})
