import {BusList} from "../classes/busList";
import {Bus} from "../classes/bus";
import {BusStopList} from "../classes/busStopList";
import {BusStop} from "../classes/busStop";
import {pullBusTimes, pullPostcodeDetails, pullStopPointsNearLocation, pullStopTypes} from "./apiCalls";
import {BusInfo, BusStopInfos, LatLongLocation, PostCodeLocationSearchResponse} from "./apiResponseInterfaces";

export async function busesFromPostcode(userInput: string, numBuses: number, numBusStops: number): Promise<void> {
    const latLong = await getLatLongForPostcode(userInput);
    const busStopList = await getBusStopListNearLatLong(latLong);
    const busStopIDs: string[] = busStopList.getNearestBusStopIDs(numBusStops);
    const busList = await getUpcomingBusesForBusStopIDList(busStopIDs);
    busList.printNextBuses(numBuses);
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

function createBusStopList(data: BusStopInfos, busStopList: BusStopList) {
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

function appendToBusList(data: BusInfo[], busList: BusList): BusList {
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation, dataItem.stationName);
        busList.addBus(bus);
    }
    return busList;
}