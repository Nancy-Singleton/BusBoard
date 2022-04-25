import {Bus} from "./bus";

export class BusList {

    buses: Bus[] = [];

    addBus(bus: Bus): void {
        this.buses.push(bus);
    }

    sortBuses(): void {
        this.buses.sort((bus1, bus2) => bus1.timeToStationSeconds - bus2.timeToStationSeconds)
    }

    printNextBuses(numBuses: number): void {
        for (let i = 0; i < numBuses; i++) {
            this.buses[i].printBus();
        }
    }
}