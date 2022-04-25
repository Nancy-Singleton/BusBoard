"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function busTimes(stopID) {
    (0, node_fetch_1.default)('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals')
        .then(res => res.json())
        .then(body => processData(body));
}
function processData(data) {
    const busList = new NextBuses();
    for (const dataItem of data) {
        let bus = new Bus(dataItem.id, dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    busList.printNextBuses(5);
}
class NextBuses {
    constructor() {
        this.buses = [];
    }
    addBus(bus) {
        this.buses.push(bus);
    }
    //SORTER
    sortBuses() {
        console.log("We will sort it");
    }
    printNextBuses(numBuses) {
        for (let i = 0; i < numBuses; i++) {
            this.buses[i].printBus();
        }
    }
}
class Bus {
    constructor(busId, lineName, destinationName, timeToStation) {
        this.busId = busId;
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.timeToStation = timeToStation;
    }
    printBus() {
        console.log("Bus ID: " + this.busId);
        console.log("Line Name: " + this.lineName);
        console.log("Destination Name: " + this.destinationName);
        console.log("Time to Station: " + this.timeToStation);
    }
}
busTimes("490008660N");
//# sourceMappingURL=index.js.map