export class Bus {
    lineName: string;
    destinationName: string;
    timeToStationSeconds: number;
    nextStopName: string;

    constructor(lineName: string, destinationName: string, timeToStationSeconds: number, nextStopName: string) {
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.timeToStationSeconds = timeToStationSeconds;
        this.nextStopName = nextStopName;
    }

    formatTime(): string {
        //todo What if the bus is due in over an hour?
        const minutes = Math.floor(this.timeToStationSeconds / 60);
        const seconds = this.timeToStationSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, '0')}`

    }

    printBus(): void {
        console.log("Line Name: " + this.lineName);
        console.log("Next Station: " + this.nextStopName);
        console.log("Destination Name: " + this.destinationName);
        console.log("Time Until Arrival at Next Station: " + this.formatTime());
    }

}