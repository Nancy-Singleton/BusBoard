import fetch, {Response} from "node-fetch";

export async function pullBusTimes(stopID: string): Promise<Response> {
    const response = await fetch('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals?app_id=StopPoint&app_key=71540a422af840f68aa8cde68c33febe');
    if (response.ok) {
        return response;
    } else {
        throw new Error("Invalid Stop ID.")
    }
}

export async function pullStopTypes(): Promise<Response> {
    const response = await fetch('https://api.tfl.gov.uk/StopPoint/Meta/StopTypes');
    if (response.ok) {
        return response;
    } else {
        throw new Error("Error pulling stop types from API.")
    }
}

export async function pullStopPointsNearLocation(latitude: number, longitude: number, stopPointTypes: string): Promise<Response> {
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=${stopPointTypes}&radius=500&modes=bus`);
    if (response.ok) {
        return response;
    } else {
        throw new Error("Error pulling stop points from API. Check latitude, longitude, stopPointTypes inputs.")
    }
}

export async function pullPostcodeDetails(postcode: string): Promise<Response> {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
    if (response.ok) {
        return response;
    } else {
        throw new Error("Invalid postcode.")
    }
}