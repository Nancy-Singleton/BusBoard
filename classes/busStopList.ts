import {BusStop} from "./busStop";

export class BusStopList {
    busStopList: BusStop[] = [];

    addBusStop(busStop: BusStop) {
        this.busStopList.push(busStop);
    }

    sortBusStops() {
        this.busStopList.sort((busStop1, busStop2) => {
            return busStop1.distance - busStop2.distance;
        })
    }
}