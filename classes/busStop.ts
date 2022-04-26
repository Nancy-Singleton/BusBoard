
export class BusStop{

    busStopNaptanID: string;
    name: string;
    distance: number;

    constructor(busStopNaptanID: string, name: string, distance: number) {
        this.busStopNaptanID = busStopNaptanID;
        this.name = name;
        this.distance = distance;
    }
}