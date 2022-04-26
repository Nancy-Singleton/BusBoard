import {busesFromPostcode} from "./functions/getBusInfoFunctions";
import {getUserInput} from "./functions/userInput";

async function printNextBusesNearPostcode() {
    try {
        const userInput = getUserInput();
        await busesFromPostcode(userInput, 5, 2);
    } catch (error: any) {
        console.log("Caught error.");
        console.log(error.message);
    }
}

printNextBusesNearPostcode().then(() => console.log("Finished running code."));

