
export class BusStop{

    busStopNaptanID: string;
    longitude: number;
    latitude: number;

    constructor(busStopNaptanID: string, longitude: number, latitude: number) {
        this.busStopNaptanID = busStopNaptanID;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}