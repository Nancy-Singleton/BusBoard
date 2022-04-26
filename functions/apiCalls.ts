import {Response} from "node-fetch";
import {DataFetcher} from "../classes/dataFetcher";

const tflStopPointUrl = "https://api.tfl.gov.uk/StopPoint/";
const postcodeUrl = "https://api.postcodes.io/postcodes/";

export async function pullBusTimes(stopID: string): Promise<Response> {
    const url = tflStopPointUrl + `${stopID}/Arrivals`;
    const params = {};
    const errorMessage = "Invalid Stop ID.";
    let dataFetcher = new DataFetcher(url,params,errorMessage);
    return await dataFetcher.fetchData();
}

export async function pullStopTypes(): Promise<Response> {
    const url = tflStopPointUrl + 'Meta/StopTypes';
    const params = {};
    const errorMessage = "Error pulling stop types from API.";
    let dataFetcher = new DataFetcher(url,params,errorMessage);
    return await dataFetcher.fetchData();
}

export async function pullStopPointsNearLocation(latitude: number, longitude: number, stopPointTypes: string): Promise<Response> {
    const url = tflStopPointUrl;
    const params = {lat: latitude, lon: longitude, stopTypes: stopPointTypes, radius: "500", modes: "bus"};
    const errorMessage = "Error pulling stop points from API. Check latitude, longitude, stopPointTypes inputs.";
    let dataFetcher = new DataFetcher(url,params,errorMessage);
    return await dataFetcher.fetchData();
}

export async function pullPostcodeDetails(postcode: string): Promise<Response> {
    const url = postcodeUrl + postcode;
    const params = {};
    const errorMessage = "Invalid postcode.";
    let dataFetcher = new DataFetcher(url,params,errorMessage);
    return await dataFetcher.fetchData();
}
