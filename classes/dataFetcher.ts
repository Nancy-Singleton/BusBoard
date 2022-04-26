import fetch from "node-fetch";

export class DataFetcher {
    url: string;
    params: object;
    private paramsString: string = "";
    errorMessage: string;

    constructor(url: string, params: object, errorMessage: string) {
        this.url = url;
        this.params = params;
        this.buildParamsString();
        this.errorMessage = errorMessage;
    }

    buildParamsString(): void {
        const paramList = Object.keys(this.params);
        paramList.forEach((param : string, index) => {
            this.paramsString = index === 0 ? this.paramsString + '?' : this.paramsString;
            //TODO: Can we fix this so that we don't need @ts-ignore?
            // @ts-ignore
            this.paramsString += `${param}=${this.params[param]}`;
            this.paramsString = index < paramList.length - 1 ? this.paramsString + '&' : this.paramsString;
        })
    }

    async fetchData() {
        const response = await fetch(this.url + this.paramsString);
        if (response.ok) {
            return response;
        } else {
            throw new Error(this.errorMessage);
        }
    };
}