import fetch, {Response} from "node-fetch";
import {BusList} from "./classes/busList";
import {Bus} from "./classes/bus";
import promptSync from 'prompt-sync';

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

export async function busesFromPostcode(userInput : string, numBuses: number) : Promise<void> {
    //todo Get LAT and LON of postcode
    /*let postcodeResponse = await  pullPostcodeDetails(userInput);
    let postcodeJSON = await postcodeResponse.json();
    let latLong = [postcodeJSON.result.latitude,postcodeJSON.result.longitude];
    console.log(latLong);*/
    let stopTypesResponse = await getStopTypes();
    let stopTypesJSON = await stopTypesResponse.json()
    let stopTypes=stopTypesJSON.join(",");
    console.log(stopTypes);
    //todo Find nearest two bus stops
    //todo Error catching
    let busStops : string[] = ["490015367S","490015367S"];
    const busList = new BusList();
    for(let i=0;i<busStops.length;i++) {
        let response = await pullBusTimes(busStops[i]);
        let busTimesJSON = await response.json();
        processBusList(busTimesJSON, busList);
    }
    busList.sortBuses();
    busList.printNextBuses(numBuses);
}

export async function pullBusTimes(stopID: string): Promise<Response> {
        return await fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals?app_id=StopPoint&app_key=71540a422af840f68aa8cde68c33febe')
}

export async function getStopTypes(): Promise<Response> {
    return await fetch('https://api.tfl.gov.uk/StopPoint/Meta/StopTypes')
}

/*export async function pullNearbyStops(latLong : string[]): Promise<Response> {
    return await fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals?app_id=StopPoint&app_key=71540a422af840f68aa8cde68c33febe')
}*/

function processBusList(data: any, busList : BusList): BusList {
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    return busList;
}


export async function pullPostcodeDetails(postcode: string): Promise<Response> {
    return await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
}