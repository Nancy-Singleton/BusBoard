import fetch from 'node-fetch';

function busTimes(stopID: string) {
    fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals')
        .then(res => res.json())
        .then(body => processData(body));
}

function processData(data: any) {
    const busList = new NextBuses();
    for (const dataItem of data) {
        let bus = new Bus(dataItem.id, dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    busList.printNextBuses(5);
}

class NextBuses {
    buses: Bus[] = [];

    addBus(bus: Bus): void {
        this.buses.push(bus);
    }

    //SORTER
    sortBuses(): void {
        console.log("We will sort it");
    }

    printNextBuses(numBuses: number): void {
        for (let i = 0; i < numBuses; i++) {
            this.buses[i].printBus();
        }
    }
}

class Bus {
    busId: string;
    lineName: string;
    destinationName: string;
    timeToStation: number;

    constructor(busId: string, lineName: string, destinationName: string, timeToStation: number) {
        this.busId = busId;
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.timeToStation = timeToStation;
    }

    printBus(): void {
        console.log("Bus ID: " + this.busId);
        console.log("Line Name: " + this.lineName);
        console.log("Destination Name: " + this.destinationName);
        console.log("Time to Station: " + this.timeToStation);
    }

}

busTimes("490008660N");
