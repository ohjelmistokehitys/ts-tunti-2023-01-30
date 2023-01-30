import { readFileSync } from 'fs';
import path from 'path';

// you can generate the relative path to the CSV that is in the parent folder of this file:
const csvFile: string = path.join(__dirname, '..', 'postalcodes.csv');

// file can be read into a string with the `readFileSync` function:
let fileContents: string = readFileSync(csvFile, 'utf-8');


// the string can be split into lines with `split`:
let lines: string[] = fileContents.trim().split(/\r?\n/);

// you can access command line arguments via `process.argv` variable:
let params: string[] = process.argv;
let input = params.at(-1)!.toUpperCase();

for (let line of lines) {
    let parts = line.split(',');

    if (parts[0] === input) {
        console.log(parts[1]);
    }
}
