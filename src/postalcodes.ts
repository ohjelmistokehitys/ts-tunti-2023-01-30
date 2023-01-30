import { readPostOffices } from './postalFileReader';

// https://stackoverflow.com/a/24457420
function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

// you can access command line arguments via `process.argv` variable:
let params: string[] = process.argv;
let input = params.at(-1)!;

let postOffices = readPostOffices();

if (isNumeric(input)) {
    if (input in postOffices) {
        console.log(postOffices[input].postcode_fi_name);
    } else {
        console.log(`Postal code ${input} not found`);
    }
} else {
    let matches = Object.values(postOffices).filter(office => office.postcode_fi_name.toUpperCase() === input.toUpperCase());
    let codes = matches.map(office => office.postcode);
    codes.sort();
    console.log(codes.join(', '));
}
