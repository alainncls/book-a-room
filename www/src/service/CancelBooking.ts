import ContractFactory from "../config/ContractFactory";
import BookARoomContract from "../config/BookARoomContract";

class CancelBooking {
    private contractFactory: ContractFactory;

    constructor(contractFactory: ContractFactory) {
        this.contractFactory = contractFactory
    }

    async cancelBooking(roomId: number, hour: number, eventCancelListener: any): Promise<void> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        bookARoom.onCancel(eventCancelListener)
        await bookARoom.cancelBooking(roomId, hour)
    }
}

export default CancelBooking