import {BusList} from "../classes/busList";
import {Bus} from "../classes/bus";
import {BusStopList} from "../classes/busStopList";
import {BusStop} from "../classes/busStop";
import {pullBusTimes, pullPostcodeDetails, pullStopPointsNearLocation, pullStopTypes} from "./apiCalls";

export async function busesFromPostcode(userInput: string, numBuses: number, numBusStops: number): Promise<void> {
    const latLong = await getLatLongForPostcode(userInput);
    const stopTypes = await getStopTypesString();
    const busStopList = await getBusStopListNearLocation(latLong, stopTypes);
    const busStopIDs: string[] = busStopList.getNearestBusStopIDs(numBusStops);
    const busList = await getUpcomingBusesForBusStopIDList(busStopIDs);
    busList.printNextBuses(numBuses);
}

async function getLatLongForPostcode(userInput: string) {
    let postcodeResponse = await pullPostcodeDetails(userInput);
    let postcodeJSON = await postcodeResponse.json();
    return [postcodeJSON.result.latitude, postcodeJSON.result.longitude];
}

async function getStopTypesString() {
    const stopTypesResponse = await pullStopTypes();
    const stopTypesJSON = await stopTypesResponse.json()
    return stopTypesJSON.join(",");
}

async function getBusStopListNearLocation(latLong: number[], stopTypes: string) {
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

function createBusStopList(data: any, busStopList: BusStopList) {
    for (const dataItem of data.stopPoints) {
        let parentId = dataItem.naptanId;
        let childIds: string[] = [];
        for (let i = 0; i < dataItem.lineGroup.length; i++) {
            childIds.push(dataItem.lineGroup[i].naptanIdReference);
        }
        let busStop = new BusStop(parentId, childIds, dataItem.commonName, dataItem.distance);
        busStopList.addBusStop(busStop);
    }
}

function appendToBusList(data: any, busList: BusList): BusList {
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation, dataItem.stationName);
        busList.addBus(bus);
    }
    return busList;
}