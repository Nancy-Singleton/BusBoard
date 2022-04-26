import fetch, {Response} from "node-fetch";

export async function pullBusTimes(stopID: string): Promise<Response> {
    return await fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals?app_id=StopPoint&app_key=71540a422af840f68aa8cde68c33febe')
}

export async function pullStopTypes(): Promise<Response> {
    return await fetch('https://api.tfl.gov.uk/StopPoint/Meta/StopTypes')
}

export async function pullStopPointsNearLocation(latitude: number, longitude: number, stopPointTypes: string): Promise<Response> {
    return await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=${stopPointTypes}&radius=500&modes=bus`)
}

export async function pullPostcodeDetails(postcode: string): Promise<Response> {
    return await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
}