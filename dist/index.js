"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function busTimes(stopID) {
    (0, node_fetch_1.default)('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals')
        .then(res => res.json())
        .then(body => {
        const busList = ProcessBusList(body);
        busList.printNextBuses(5);
    });
}
function ProcessBusList(data) {
    const busList = new BusList();
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    return busList;
}
class BusList {
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
    constructor(lineName, destinationName, timeToStationSeconds) {
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.timeToStationSeconds = timeToStationSeconds;
    }
    formatTime() {
        //todo What if the bus is due in over an hour?
        const minutes = Math.floor(this.timeToStationSeconds / 60);
        const seconds = this.timeToStationSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    printBus() {
        console.log("Line Name: " + this.lineName);
        console.log("Destination Name: " + this.destinationName);
        console.log("Time Until Arrival: " + this.formatTime());
    }
}
busTimes("490008660N");
//# sourceMappingURL=index.js.map