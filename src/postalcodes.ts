import { readFileSync } from 'fs';
import path from 'path';


interface PostOffice {
    code: string;
    name: string;
}

function readPostOffices(): PostOffice[] {
    // you can generate the relative path to the CSV that is in the parent folder of this file:
    const csvFile: string = path.join(__dirname, '..', 'postalcodes.csv');

    // file can be read into a string with the `readFileSync` function:
    let fileContents: string = readFileSync(csvFile, 'utf-8');

    // the string can be split into lines with `split`:
    let lines: string[] = fileContents.trim().split(/\r?\n/);

    // make an array of PostOffice objects and return it
    return lines.map(line => {
        let [code, name] = line.split(',');
        return { code, name };
    });
}

// https://stackoverflow.com/a/24457420
function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

// you can access command line arguments via `process.argv` variable:
let params: string[] = process.argv;
let input = params.at(-1)!;

let postOffices = readPostOffices();

if (isNumeric(input)) {
    /* kertoo postitoimipaikan nimen, kun sille annetaan parametrina postinumero */
    let found = postOffices.find(office => office.code === input);
    console.log(found?.name);
} else {
    /* listaa kaikki annettuun nimeen liittyvät postinumerot samalla rivillä kasvavassa järjestyksessä */
    let matches = postOffices.filter(office => office.name.toLowerCase() === input.toLowerCase());
    let codes: string[] = matches.map(office => office.code);
    codes.sort();
    console.log(codes.join(', '));
}
