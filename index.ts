import {busTimes, getUserInput, searchPostcode} from "./functions";

try {

    searchPostcode("NW18DF");

    //const userInput = getUserInput();
    //busTimes(userInput);


} catch (error: any) {
    console.log(error.message);
}


