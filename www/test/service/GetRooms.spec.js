import {expect} from 'chai'
import InMemoryContractFactory from "../InMemoryContractFactory";
import GetPlanning from "../../src/service/GetPlanning";
import GetRooms from "../../src/service/GetRooms";

describe('GetRooms', () => {
    let getRooms

    beforeEach(() => {
        const contractFactory = new InMemoryContractFactory()
        getRooms = new GetRooms(new GetPlanning(contractFactory))
    })

    it('should get Coca Rooms', async () => {
        // Given
        // When
        const cocaRooms = await getRooms.getCocaRooms()
        // Then
        expect(cocaRooms).to.have.length(10)
        expect(cocaRooms[0].id).to.equal(0);
        expect(cocaRooms[0].planning).to.deep.equal(Array(24).fill('0x0000000000000000000000000000000000000000'));
    })

    it('should get Pepsi Rooms', async () => {
        // Given
        // When
        const pepsiRooms = await getRooms.getPepsiRooms()
        // Then
        expect(pepsiRooms).to.have.length(10)
        expect(pepsiRooms[0].id).to.equal(10);
        expect(pepsiRooms[0].planning).to.deep.equal(Array(24).fill('0x0000000000000000000000000000000000000000'));
    })
})
