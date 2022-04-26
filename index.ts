import {busesFromPostcode} from "./functions/getBusInfoFunctions";
import {getUserInput} from "./functions/userInput";

async function printNextBusesNearPostcode() {
    const userInput = getUserInput();
    const busList = await busesFromPostcode(userInput, 2);
    busList.printNextBuses(5);
}

printNextBusesNearPostcode().then(() => console.log("Finished running code.")).catch(function (error) {
    console.log("Caught error.");
    console.log(error.message);
});

