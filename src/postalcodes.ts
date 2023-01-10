import { readFileSync } from 'fs';
import path from 'path';

const csvFile = path.join(__dirname, '..', 'postalcodes.csv');

interface PostOffice {
    readonly name: string,
    readonly code: string
}

function readPostOffices(csvFile: string): PostOffice[] {
    let fileContents = readFileSync(csvFile, 'utf-8');
    let lines: string[] = fileContents.trim().split('\n');

    return lines.map(line => {
        let [code, name] = line.split(',');
        return { code, name };
    });
}

function isNumeric(value?: string): boolean {
    return Number.isInteger(Number(value));
}

function main(): void {
    const param = process.argv.at(2);
    if (param === undefined) {
        console.log(`Please add the postal code or name as parameter.`);
        return;
    }

    const offices = readPostOffices(csvFile);

    if (isNumeric(param)) {
        let found = offices.find(office => office.code === param);

        console.log(found?.name);

    } else {
        let findName = param.toLowerCase();
        let filtered = offices.filter(office => office.name.toLowerCase() === findName);
        let codes = filtered.map(office => office.code);

        console.log(codes.sort().join(', '));
    }
}

if (require.main === module) {
    main();
}
