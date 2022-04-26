import promptSync from "prompt-sync";

const prompt = promptSync();

function validateUserInput(userInput: string | null): boolean {
    return !!userInput;
}

export function getUserInput(): string {
    const userInput = prompt("Enter a postcode: ");
    if (validateUserInput(userInput)) {
        return userInput as string;
    }
    throw new Error("No user input.");
}