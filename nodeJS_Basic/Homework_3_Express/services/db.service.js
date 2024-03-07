import fs from 'fs';

export function readData(db) {
    return JSON.parse(fs.readFileSync(db));
};

export function writeData(db, data) {
    fs.writeFileSync(db, JSON.stringify(data));
};

export function appendData(db, data) {
    fs.appendFileSync(db, data);
};

