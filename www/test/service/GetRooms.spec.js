import {expect} from 'chai'
import InMemoryContractFactory from "../InMemoryContractFactory";
import GetPlanning from "../../src/service/GetPlanning";
import GetRooms from "../../src/service/GetRooms";

describe('GetRooms', () => {
    let contractFactory
    let getRooms

    beforeEach(() => {
        contractFactory = new InMemoryContractFactory()
        getRooms = new GetRooms(new GetPlanning(contractFactory))
    })

    it('should get Coca Rooms', async () => {
        // Given
        const roomId = 1
        contractFactory.bookARoom.withEmptyPlanning(roomId)
        // When
        const cocaRooms = await getRooms.getCocaRooms()
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
        const pepsiRooms = await getRooms.getPepsiRooms()
        // Then
        expect(pepsiRooms).to.have.length(10)
        expect(pepsiRooms[roomId - 10].id).to.equal(roomId);
        expect(pepsiRooms[roomId - 10].planning).to.deep.equal(Array(24).fill('0x0000000000000000000000000000000000000000'));
    })
})
