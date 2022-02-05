class Room {
    private id: number;
    private name: string;
    private planning: string[];

    constructor(id: number, name: string, planning: string[]) {
        this.id = id
        this.name = name
        this.planning = planning
    }

    getId(): number {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getPlanning(): string[] {
        return this.planning
    }

    setPlanning(planning: string[]) {
        this.planning = planning
    }
}

export default Room
