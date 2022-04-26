import {BusStop} from "./busStop";

export class BusStopList {
    busStopList : BusStop[] = [];
    searchLatitude: number;
    searchLongitude: number;

    constructor(searchLatitude: number, searchLongitude: number) {
        this.searchLatitude = searchLatitude;
        this.searchLongitude = searchLongitude;
    }

    addBusStop(busStop: BusStop){
        this.busStopList.push(busStop);
    }

    private getSquareDistance(lat: number, long: number) {
        return Math.pow(lat - this.searchLatitude, 2)  + Math.pow(long - this.searchLongitude,2);
    }

    sortBusStops(){
        this.busStopList.sort((busStop1, busStop2 ) => {
            const distance1Squared = this.getSquareDistance(busStop1.latitude, busStop1.longitude);
            const distance2Squared = this.getSquareDistance(busStop2.latitude, busStop2.longitude);
            return distance1Squared - distance2Squared;
        })
    }

    getNearestBusStopIDs(numToGet: number): string[] {
        let busStopIDs : string[] = [];
        for(let i = 0; i < numToGet && i < this.busStopList.length; i++){
            const busStop = this.busStopList[i];
            //const childIDs = busStop
            //busStopIDs = busStopIDs.concat([busStopIDs, busStop.c])
        }
        return [];
    }
}