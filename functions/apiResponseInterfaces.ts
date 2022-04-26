export interface LatLongLocation {
    latitude: number;
    longitude: number;
}

export interface PostCodeLocationSearchResponse {
    result : LatLongLocation;
}

export interface LineGroup {
    naptanIdReference: string;
}

export interface BusStopInfo {
    naptanId: string;
    distance: number;
    commonName: string;
    lineGroup: LineGroup[];

}

export interface BusStopInfos {
    stopPoints : BusStopInfo[];
}

export interface BusInfo {
    lineName: string;
    destinationName: string;
    timeToStation: number;
    stationName: string;
}