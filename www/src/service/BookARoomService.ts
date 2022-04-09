import ContractFactory from "../config/ContractFactory";
import BookARoomContract from "../config/BookARoomContract";
import Room from "../model/Room";
import Booking from "../model/Booking";

class BookARoomService {
    private contractFactory: ContractFactory;

    constructor(contractFactory: ContractFactory) {
        this.contractFactory = contractFactory
    }

    async getOwner(): Promise<string> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        return bookARoom.getOwner()
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

    async addRoom(name: string, eventAddListener: any): Promise<void> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        bookARoom.onAdd(eventAddListener)
        await bookARoom.addRoom(name)
    }

    async nameRoom(roomId: number, newName: string, eventRenameListener: any): Promise<void> {
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        bookARoom.onRename(eventRenameListener)
        await bookARoom.nameRoom(roomId, newName)
    }

    async getAllRooms(): Promise<Room[]> {
        const allRooms: Room[] = []
        const bookARoom: BookARoomContract = this.contractFactory.getBookARoomContract()
        const roomsNumber = await bookARoom.getRoomsNumber()

        for (let i = 0; i < roomsNumber; i++) {
            allRooms.push(new Room(i, await bookARoom.getRoom(i), await bookARoom.getPlanning(i)));
        }

        return allRooms;
    }

    async getBookings(userAddress: string): Promise<Booking[]> {
        const allRooms: Room[] = await this.getAllRooms();

        return allRooms
            .filter(room => room.getPlanning())
            .map(room => room.getPlanning()
                .map((booker, hour) => booker === userAddress ? new Booking(room.getId(), room.getName(), booker, hour) : undefined)
                .filter(booking => booking))
            .flat()
    }
}

export default BookARoomService