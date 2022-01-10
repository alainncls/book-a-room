import ContractFactory from "../config/ContractFactory";
import BookARoomContract from "../config/BookARoomContract";

class GetPlanning {
    private contractFactory: ContractFactory;

    constructor(contractFactory: ContractFactory) {
        this.contractFactory = contractFactory
    }

    async getPlanning(roomId: number): Promise<string[]> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        return bookARoom.getPlanning(roomId)
    }
}

export default GetPlanning