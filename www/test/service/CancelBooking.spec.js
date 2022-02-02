import {expect} from 'chai'
import {hexlify} from 'ethers/lib/utils'
import InMemoryContractFactory from '../InMemoryContractFactory'
import CancelBooking from "../../src/service/CancelBooking";

describe('CancelBooking', () => {
    let contractFactory
    let cancelBooking

    beforeEach(() => {
        contractFactory = new InMemoryContractFactory()
        cancelBooking = new CancelBooking(contractFactory)
    })

    it('should cancel a booking', async () => {
        // Given
        const userAddress = hexlify(10)
        const roomId = 1
        const hour = 1
        contractFactory.bookARoom.withFilledPlanning(userAddress, roomId, hour)
        // When
        await cancelBooking.cancelBooking(roomId, hour, () => {
        })
        // Then
        expect(contractFactory.bookARoom.rooms[roomId].planning[hour]).to.equal('0x0000000000000000000000000000000000000000')
    })
})
