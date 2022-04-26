import fetch, {Response} from "node-fetch";
import {BusList} from "./classes/busList";
import {Bus} from "./classes/bus";
import promptSync from 'prompt-sync';
import {BusStopList} from "./classes/busStopList";
import {BusStop} from "./classes/busStop";

const prompt = promptSync();

export function getUserInput(): string {
    const userInput = prompt("Enter a postcode: ");
    if (validateUserInput(userInput)) {
        return userInput as string;
    }
    throw new Error("No user input");
}

function validateUserInput(userInput: string | null): boolean {
    return !!userInput;
}

export async function busesFromPostcode(userInput: string, numBuses: number): Promise<void> {
    //todo Get LAT and LON of postcode
    let postcodeResponse = await pullPostcodeDetails(userInput);
    let postcodeJSON = await postcodeResponse.json();
    let latLong = [postcodeJSON.result.latitude, postcodeJSON.result.longitude];

    const stopTypesResponse = await pullStopTypes();
    const stopTypesJSON = await stopTypesResponse.json()
    const stopTypes = stopTypesJSON.join(",");

    const stopsNearLocation = await pullStopPointsNearLocation(latLong[0], latLong[1], stopTypes);
    const stopsNearLocationJSON = await stopsNearLocation.json();

    const busStopList = new BusStopList();
    processBusStopList(stopsNearLocationJSON, busStopList);
    busStopList.sortBusStops();

    //todo Find nearest two bus stops
    //todo Error catching
    let busStops: string[] = ["490015367S", "490015367S"];
    const busList = new BusList();
    for (let i = 0; i < busStops.length; i++) {
        let response = await pullBusTimes(busStops[i]);
        let busTimesJSON = await response.json();
        processBusList(busTimesJSON, busList);
    }
    busList.sortBuses();
    busList.printNextBuses(numBuses);
}

function processBusStopList(data: any, busStopList: BusStopList) {
    for (const dataItem of data.stopPoints) {
        let busStop = new BusStop("ID", dataItem.commonName, dataItem.distance);
        busStopList.addBusStop(busStop);
    }
}

function processBusList(data: any, busList: BusList): BusList {
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    return busList;
}


async function pullBusTimes(stopID: string): Promise<Response> {
    return await fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals?app_id=StopPoint&app_key=71540a422af840f68aa8cde68c33febe')
}

async function pullStopTypes(): Promise<Response> {
    return await fetch('https://api.tfl.gov.uk/StopPoint/Meta/StopTypes')
}

async function pullStopPointsNearLocation(latitude: number, longitude: number, stopPointTypes: string): Promise<Response> {
    return await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=${stopPointTypes}&radius=500&modes=bus`)
}

async function pullPostcodeDetails(postcode: string): Promise<Response> {
    return await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
}


