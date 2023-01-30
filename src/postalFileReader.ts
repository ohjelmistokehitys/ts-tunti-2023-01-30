interface JSONPostOffice {
    postcode_fi_name: string;
    postcode: string;
}

type JSONPostOfficeMap = Record<string, JSONPostOffice>;

export function readPostOffices(): JSONPostOfficeMap {
    return require('../postcode_map.json') as JSONPostOfficeMap;
}
