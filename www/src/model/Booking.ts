class Booking {
    private roomId: number;
    private roomName: string;
    private booker: string;
    private hour: number;

    constructor(roomId: number, roomName: string, booker: string, hour: number) {
        this.roomId = roomId
        this.roomName = roomName
        this.booker = booker
        this.hour = hour
    }

    getRoomId(): number {
        return this.roomId
    }

    getRoomName(): string {
        return this.roomName
    }

    getBooker(): string {
        return this.booker
    }

    getHour(): number {
        return this.hour
    }
}

export default Booking
