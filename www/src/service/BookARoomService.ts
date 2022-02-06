import ContractFactory from "../config/ContractFactory";
import BookARoomContract from "../config/BookARoomContract";
import Room from "../model/Room";

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

    async getRoom(roomId: number): Promise<Room> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        return new Room(roomId, await bookARoom.getRoom(roomId), await bookARoom.getPlanning(roomId))
    }

    async nameRoom(roomId: number, newName: string, eventRenameListener: any): Promise<void> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        bookARoom.onRename(eventRenameListener)
        await bookARoom.nameRoom(roomId, newName)
    }

    async getCocaRooms(): Promise<Room[]> {
        const cocaRooms: Room[] = []
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()

        for (let i = 0; i < 10; i++) {
            cocaRooms.push(new Room(i, await bookARoom.getRoom(i), await bookARoom.getPlanning(i)));
        }

        return cocaRooms;
    }

    async getPepsiRooms(): Promise<any[]> {
        const pepsiRooms: Room[] = []
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()

        for (let i = 10; i < 20; i++) {
            pepsiRooms.push(new Room(i, await bookARoom.getRoom(i), await bookARoom.getPlanning(i)));
        }

        return pepsiRooms;
    }
}

export default BookARoomService