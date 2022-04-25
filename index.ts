import fetch from 'node-fetch';

function busTimes(stopID: string) {
    fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals')
        .then(res => res.json())
        .then(body => {
            const busList = ProcessBusList(body);
            busList.printNextBuses(5);
        });
}

function ProcessBusList(data: any): BusList {
    const busList = new BusList();
    for (const dataItem of data) {
        let bus = new Bus(dataItem.lineName, dataItem.destinationName, dataItem.timeToStation);
        busList.addBus(bus);
    }
    return busList;
}

class BusList {

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
    lineName: string;
    destinationName: string;
    timeToStationSeconds: number;

    constructor(lineName: string, destinationName: string, timeToStationSeconds: number) {
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.timeToStationSeconds = timeToStationSeconds;
    }

    formatTime(): string {
        //todo What if the bus is due in over an hour?
        const minutes = Math.floor(this.timeToStationSeconds/60);
        const seconds = this.timeToStationSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, '0')}`

    }

    printBus(): void {
        console.log("Line Name: " + this.lineName);
        console.log("Destination Name: " + this.destinationName);
        console.log("Time Until Arrival: " + this.formatTime());
    }

}

busTimes("490008660N");
