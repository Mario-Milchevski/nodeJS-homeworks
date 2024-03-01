// # Filesystem Homework

// ### Deadline: 10.03.2024

// ## Basic Requirements

// 1. Initialize a new npm project and create an `index.js` file.
// 2. Using the fs module create a new file called homework.txt
// 3. Create a path to the file using the `path` module
// 4. Inside the file write the following "Homework 01 in Basic Node"
// 5. Append to the file the following " FINISHED!"
// 6. Read the file contents and print them out in the console.

// ### FAQ

// - Should I use sync or async methods from fs? - Any methods you want, as long as it works without any race condition issues.
// - Should I use ES modules or CommonJS - Anything you want, preferably ES modules ("type": "module" in package.json).
// - Do I need to send package.json? - Yes.

// EXERCISE START

import fs from 'fs';
import path from 'path';

// ------------------  SYNC METHOD
// const textFilePath = path.join(import.meta.dirname, 'homework.txt');
// fs.writeFileSync(textFilePath, 'Homework 01 in Basic Node : Sync method');
// fs.appendFileSync(textFilePath, ' - FINISHED!');
// const text = fs.readFileSync(textFilePath, { encoding: 'utf-8' });
// console.log(`Text file content: \n${text}`);

// ------------------  ASYNC METHOD 

// const textFilePath = path.join(import.meta.dirname, 'homework.txt')
// fs.writeFile(textFilePath, 'Homework 01 in Basic Node : Async method', err => {
//     if (err) {
//         console.log('Error from async writeFile :', err);
//         return;
//     }
// });
// fs.appendFile(textFilePath, ' - FINISHED!', err => {
//     if (err) {
//         console.log('Error from async appendFile', err);
//     }
// })
// fs.readFile(textFilePath, { encoding: 'utf-8' }, (err, data) => {
//     if (err) {
//         console.log('Error reading async file', err);
//     }
//     console.log('Readfile text: ', data);
// })

// ------------------ PROMISE METHODS

import fsPromises from 'fs/promises';

// ------------------ THEN

// const textFilePath = path.join(import.meta.dirname, 'homework_promise.txt');
// fsPromises
//     .writeFile(textFilePath, 'Homework 01 in Basic Node : Promise (then) method')
//     .then(err => {
//         if (err) {
//             console.log('Error writing file', err);
//         }
//         return fsPromises.appendFile(textFilePath, ' - FINISHED!');
//     })
//     .then(err => {
//         if (err) {
//             console.log('Error while appending text', err);
//         }
//         return fsPromises.readFile(textFilePath, { encoding: 'utf-8' });
//     })
//     .then(value => {
//         console.log('Text: ', value);
//     })
//     .catch(err => {
//         console.log(err);
//     })
//     .finally(()=>{
//         console.log('Finally!');
//     });

// ---------------- ASYNC AWAIT APPROACH

const textFilePath = path.join(import.meta.dirname, 'homework_promise.txt');

const textReader = async () => {
    try {
        await fsPromises.writeFile(textFilePath, 'Homework 01 Basic NodeJS : Promise async awit');
        await fsPromises.appendFile(textFilePath, ' - FINISHED!');
        const text = await fsPromises.readFile(textFilePath, { encoding: 'utf-8' });
        console.log('Reading file :', text);
    } catch (err) {
        console.log('Error :', err);
    } finally {
        console.log('Finally done');
    }
};

textReader()