import ContractFactory from "../config/ContractFactory";
import BookARoomContract from "../config/BookARoomContract";

class BookARoom {
    private contractFactory: ContractFactory;

    constructor(contractFactory: ContractFactory) {
        this.contractFactory = contractFactory
    }

    async bookARoom(roomId: number, hour: number, eventBookingListener: any): Promise<void> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        bookARoom.onBook(eventBookingListener)
        await bookARoom.bookARoom(roomId, hour)
    }
}

export default BookARoom