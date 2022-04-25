import {busTimes, getUserInput} from "./functions";

try {
    const userInput = getUserInput();
    busTimes(userInput);
} catch (error: any) {
    console.log(error.message);
}


