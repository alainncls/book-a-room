import GetPlanning from './GetPlanning'

const planning: string[] = [];
const cocaRooms = [{id: 0, planning}, {id: 1, planning}, {id: 2, planning}, {id: 3, planning}, {id: 4, planning}, {id: 5, planning}, {id: 6, planning}, {id: 7, planning}, {id: 8, planning}, {id: 9, planning}];
const pepsiRooms = [{id: 10, planning}, {id: 11, planning}, {id: 12, planning}, {id: 13, planning}, {id: 14, planning}, {id: 15, planning}, {id: 16, planning}, {id: 17, planning}, {id: 18, planning}, {id: 19, planning}];

class GetRooms {
    private getPlanning: GetPlanning;

    constructor(getPlanning: GetPlanning) {
        this.getPlanning = getPlanning
    }

    async getCocaRooms(): Promise<any[]> {
        for (let i = 0; i < cocaRooms.length; i++) {
            cocaRooms[i].planning = await this.getPlanning.getPlanning(i)
        }

        return cocaRooms;
    }

    async getPepsiRooms(): Promise<any[]> {
        for (let i = 10; i < 10 + pepsiRooms.length; i++) {
            pepsiRooms[i - 10].planning = await this.getPlanning.getPlanning(i)
        }

        return pepsiRooms;
    }
}

export default GetRooms