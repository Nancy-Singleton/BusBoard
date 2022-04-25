import fetch from "node-fetch";
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

export function busTimes(stopID: string) {
    fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals?app_id=StopPoint&app_key=71540a422af840f68aa8cde68c33febe')
        .then(res => {
            if (res.ok) {
                return res
            }
            throw new Error("Invalid stop code.");
        })
        .then(res => res.json())
        .then(body => {
            const busList = processBusList(body);
            busList.sortBuses();
            busList.printNextBuses(5);
        }).catch(error => console.log(error));
}

function processBusList(data: any): BusList {
    const busList = new BusList();
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    return busList;
}