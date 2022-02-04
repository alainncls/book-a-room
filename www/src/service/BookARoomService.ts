import ContractFactory from "../config/ContractFactory";
import BookARoomContract from "../config/BookARoomContract";
import Room from "../model/Room";

const planning: string[] = [];
const cocaRooms: Room[] = Array.from({length: 10}, (_, i) => new Room(i, planning));
const pepsiRooms: Room[] = Array.from({length: 10}, (_, i) => new Room(i + 10, planning));

class BookARoomService {
    private contractFactory: ContractFactory;

    constructor(contractFactory: ContractFactory) {
        this.contractFactory = contractFactory
    }

    async bookARoom(roomId: number, hour: number, eventBookingListener: any): Promise<void> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        bookARoom.onBook(eventBookingListener)
        await bookARoom.bookARoom(roomId, hour)
    }

    async cancelBooking(roomId: number, hour: number, eventCancelListener: any): Promise<void> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        bookARoom.onCancel(eventCancelListener)
        await bookARoom.cancelBooking(roomId, hour)
    }

    async getPlanning(roomId: number): Promise<string[]> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        return bookARoom.getPlanning(roomId)
    }

    async getCocaRooms(): Promise<any[]> {
        for (let i = 0; i < cocaRooms.length; i++) {
            cocaRooms[i].setPlanning(await this.getPlanning(i))
        }

        return cocaRooms;
    }

    async getPepsiRooms(): Promise<any[]> {
        for (let i = 10; i < 10 + pepsiRooms.length; i++) {
            pepsiRooms[i - 10].setPlanning(await this.getPlanning(i))
        }

        return pepsiRooms;
    }
}

export default BookARoomService