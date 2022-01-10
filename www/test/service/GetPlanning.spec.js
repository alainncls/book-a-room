import {expect} from 'chai'
import InMemoryContractFactory from "../InMemoryContractFactory";
import GetPlanning from "../../src/service/GetPlanning";

describe('GetPlanning', () => {
    let contractFactory
    let getPlanning

    beforeEach(() => {
        contractFactory = new InMemoryContractFactory()
        getPlanning = new GetPlanning(contractFactory)
    })

    it('should find an empty planning', async () => {
        // Given
        // When
        const planning = await getPlanning.getPlanning(0)
        // Then
        expect(planning).to.have.length(24)
        expect(planning[0]).to.equal("0x0000000000000000000000000000000000000000");
    })
})
