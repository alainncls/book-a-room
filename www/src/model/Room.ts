class Room {
    private id: number;
    private planning: string[];

    constructor(id: number, planning: string[]) {
        this.id = id
        this.planning = planning
    }

    getName(): number {
        return this.id
    }

    getPlanning(): string[] {
        return this.planning
    }

    setPlanning(planning: string[]) {
        this.planning = planning
    }
}

export default Room
