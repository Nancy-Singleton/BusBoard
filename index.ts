import {busesFromPostcode} from "./functions/getBusInfoFunctions";
import {getUserInput} from "./functions/userInput";

async function printNextBusesNearPostcode() {
    const userInput = getUserInput();
    await busesFromPostcode(userInput, 5, 2);
}

printNextBusesNearPostcode().then(() => console.log("Finished running code.")).catch(function (error) {
    console.log("Caught error.");
    console.log(error.message);
});

