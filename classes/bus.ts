export class Bus {
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
        const minutes = Math.floor(this.timeToStationSeconds / 60);
        const seconds = this.timeToStationSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, '0')}`

    }

    printBus(): void {
        console.log("Line Name: " + this.lineName);
        console.log("Destination Name: " + this.destinationName);
        console.log("Time Until Arrival: " + this.formatTime());
    }

}