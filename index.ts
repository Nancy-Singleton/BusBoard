import {busesFromPostcode, getUserInput, searchPostcode} from "./functions";

try {

    //searchPostcode("NW18DF");

    const userInput = getUserInput();
    busesFromPostcode(userInput, 5).then(() => console.log("Completed"));



} catch (error: any) {
    console.log(error.message);
}


