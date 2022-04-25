import fetch, {Response} from "node-fetch";
import {BusList} from "./classes/busList";
import {Bus} from "./classes/bus";
import promptSync from 'prompt-sync';

const prompt = promptSync();

export function getUserInput(): string {
    const userInput = prompt("Enter a bus stop ID: ");
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
    //todo Find nearest two bus stops
    //todo Error catching
    let busStops : string[] = ["490008660N"];
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


function processBusList(data: any, busList : BusList): BusList {
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    return busList;
}

export function searchPostcode(postcode: string): Promise<any>{
    const promise = new Promise(() =>
    fetch(`https://api.postcodes.io/postcodes/${postcode}`)
        .then(res => {
            if (res.ok) {
                return res
            }
            throw new Error("Invalid post code.");
        })
        .then(res => res.json())
        .then(body => {
            console.log(body.result.longitude + " " + body.result.latitude);
        }).catch(error => console.log(error)))
    ;
    return promise;
}