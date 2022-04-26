import {busesFromPostcode, getUserInput} from "./functions";

try {
    const userInput = getUserInput();
    busesFromPostcode(userInput, 5,2).then(() => console.log("Completed"));
} catch (error: any) {
    console.log(error.message);
}


