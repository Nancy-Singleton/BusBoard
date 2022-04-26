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

    getNearestBusStopIDs(numToGet: number): string[] {
        let busStopIDs : string[] = [];
        for(let i = 0; i < numToGet && i < this.busStopList.length; i++){
            const busStop = this.busStopList[i];
            busStopIDs = busStopIDs.concat(busStopIDs, busStop.busStopChildIds)
        }
        return busStopIDs;
    }
}