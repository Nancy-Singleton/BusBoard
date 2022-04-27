import {BusList} from "../classes/busList";
import {Bus} from "../classes/bus";
import {BusStopList} from "../classes/busStopList";
import {pullBusTimes, pullPostcodeDetails, pullStopPointsNearLocation, pullStopTypes} from "./apiCalls";
import {
    BusInfo,
    BusStopInfo,
    BusStopInfos,
    LatLongLocation,
    PostCodeLocationSearchResponse
} from "./apiResponseInterfaces";
import {BusStop} from "../classes/busStop";

export async function busesFromPostcode(userInput: string, numBusStops: number): Promise<BusList> {
    const latLong = await getLatLongForPostcode(userInput);
    const busStopList = await getBusStopListNearLatLong(latLong);
    const busStopIDs: string[] = busStopList.getNearestBusStopIDs(numBusStops);
    const busList = await getUpcomingBusesForBusStopIDList(busStopIDs);
    return busList;
}

async function getLatLongForPostcode(userInput: string): Promise<LatLongLocation> {
    let postcodeResponse = await pullPostcodeDetails(userInput);
    let postcodeJSON = await postcodeResponse.json() as PostCodeLocationSearchResponse;
    return postcodeJSON.result;
}

//Translate stop types into string format for API call
async function getStopTypesString() {
    const stopTypesResponse = await pullStopTypes();
    const stopTypesJSON = await stopTypesResponse.json() as string[]
    return stopTypesJSON.join(",");
}

//Returns a list of bus stop objects in a 200m radius of the given postcode
async function getBusStopListNearLatLong(latLong: LatLongLocation) {
    const stopTypes = await getStopTypesString();
    const stopsNearLocationResponse = await pullStopPointsNearLocation(latLong.latitude, latLong.longitude, stopTypes);
    const stopsNearLocation = await stopsNearLocationResponse.json() as BusStopInfos;
    const busStopList = new BusStopList();
    createBusStopList(stopsNearLocation, busStopList);
    busStopList.sortBusStops();
    return busStopList;
}

async function getUpcomingBusesForBusStopIDList(busStopIDs: string[]) {
    const busList = new BusList();
    for (let i = 0; i < busStopIDs.length; i++) {
        let busTimesResponse = await pullBusTimes(busStopIDs[i]);
        let busTimes = await busTimesResponse.json() as BusInfo[];
        appendToBusList(busTimes, busList);
    }
    busList.sortBuses();
    return busList;
}


function listChildIds(lineGroup: any[]) {
    let childIds: string[] = [];
    for (let i = 0; i < lineGroup.length; i++) {
        if (lineGroup[i].naptanIdReference) {
            childIds.push(lineGroup[i].naptanIdReference);
        }
    }
    return childIds;
}


function createBusStopList(busStopdata: BusStopInfos, busStopList: BusStopList): void {
    const stopPoints = busStopdata.stopPoints;
    busStopList.busStopList = stopPoints.map(function (stopPoint: any): BusStop {
        return new BusStop(stopPoint.naptanId, listChildIds(stopPoint.lineGroup), stopPoint.commonName, stopPoint.distance);
    });
}

function appendToBusList(busData: BusInfo[], busList: BusList): void {
    busList.buses = busList.buses.concat(busData.map(function (bus: any): Bus {
        return new Bus(bus.lineName, bus.destinationName, bus.timeToStation, bus.stationName);
    }));
}