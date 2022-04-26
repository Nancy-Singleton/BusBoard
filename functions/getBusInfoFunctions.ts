import {BusList} from "../classes/busList";
import {Bus} from "../classes/bus";
import {BusStopList} from "../classes/busStopList";
import {pullBusTimes, pullPostcodeDetails, pullStopPointsNearLocation, pullStopTypes} from "./apiCalls";
import {BusStop} from "../classes/busStop";

export async function busesFromPostcode(userInput: string, numBuses: number, numBusStops: number): Promise<void> {
    const latLong = await getLatLongForPostcode(userInput);
    const busStopList = await getBusStopListNearLatLong(latLong);
    const busStopIDs: string[] = busStopList.getNearestBusStopIDs(numBusStops);
    const busList = await getUpcomingBusesForBusStopIDList(busStopIDs);
    busList.printNextBuses(numBuses);
}

async function getLatLongForPostcode(userInput: string) {
    let postcodeResponse = await pullPostcodeDetails(userInput);
    let postcodeJSON = await postcodeResponse.json();
    return [postcodeJSON.result.latitude, postcodeJSON.result.longitude];
}

//Translate stop types into string format for API call
async function getStopTypesString() {
    const stopTypesResponse = await pullStopTypes();
    const stopTypesJSON = await stopTypesResponse.json()
    return stopTypesJSON.join(",");
}

//Returns a list of bus stop objects in a 200m radius of the given postcode
async function getBusStopListNearLatLong(latLong: number[]) {
    const stopTypes = await getStopTypesString();
    const stopsNearLocation = await pullStopPointsNearLocation(latLong[0], latLong[1], stopTypes);
    const stopsNearLocationJSON = await stopsNearLocation.json();
    const busStopList = new BusStopList();
    createBusStopList(stopsNearLocationJSON, busStopList);
    busStopList.sortBusStops();
    return busStopList;
}

async function getUpcomingBusesForBusStopIDList(busStopIDs: string[]) {
    const busList = new BusList();
    for (let i = 0; i < busStopIDs.length; i++) {
        let response = await pullBusTimes(busStopIDs[i]);
        let busTimesJSON = await response.json();
        appendToBusList(busTimesJSON, busList);
    }
    busList.sortBuses();
    return busList;
}

function listChildIds(lineGroup: any[]) {
    let childIds: string[] = [];
    for (let i = 0; i < lineGroup.length; i++) {
        childIds.push(lineGroup[i].naptanIdReference);
    }
    return childIds;
}

function createBusStopList(busStopdata: any, busStopList: BusStopList): void {
    const stopPoints = busStopdata.stopPoints;
    busStopList.busStopList = stopPoints.map(function (stopPoint: any): BusStop {
        return new BusStop(stopPoint.naptanId, listChildIds(stopPoint.lineGroup), stopPoint.commonName, stopPoint.distance);
    });
}

function appendToBusList(busData: any, busList: BusList): void {
    busList.buses = busList.buses.concat(busData.map(function (bus: any): Bus {
        return new Bus(bus.lineName, bus.destinationName, bus.timeToStation, bus.stationName);
    }));
}