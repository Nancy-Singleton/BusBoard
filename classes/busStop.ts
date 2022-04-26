export class BusStop {

    busStopParentId: string;
    busStopChildIds: string[];
    name: string;
    distance: number;

    constructor(busStopParentId: string, busStopChildIds: string[], name: string, distance: number) {
        this.busStopParentId = busStopParentId;
        this.name = name;
        this.distance = distance;
        this.busStopChildIds = busStopChildIds.length > 0 ? busStopChildIds : [this.busStopParentId];
    }
}