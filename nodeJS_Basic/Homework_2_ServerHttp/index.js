// # Homework 2

// ### Deadline: 15.03.2024

// ## Part 1:
// - Create server using HTTP module;
// - When the default url is hit return HTML content to the user, the content of your choice.
// - When the url `/student` is hit, return HTML with the information:
//   - Student name: "your name";
//   - Student lastname: "your lastname";
//   - Academy: "the academy you are at";
//   - Subject: "the current subject we are learning";

// ## Part 2:
// - Create server using HTTP module (or use the one from the previous part);
// - When the default url is hit return HTML content to the user, the content of your choice;
// - When the url `/add_student` is hit, return a form with one input (ex. name) and a button;
// - When we submit the button we will navigate to a new route `/all_students`;
// - In this new url `/all_students` get the value that is sent from the form and console.log it human-readable format (ex. "The student name is: name");

// ## BONUS:
// - Instead of console.log the value from the form, use the FS module to write in a file named: students.txt

import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const HOSTNAME = 'localhost';

const server = http.createServer((req, res) => {
    const URL = req.url;
    const METHOD = req.method;
    console.log("req", URL);
    console.log('res', METHOD);

    if (URL === '/') {
        res.setHeader('Content-type', 'text/html');
        res.write(`<p> This is Qinshifts G1 server if you are not a member you are at the wrong place. Press X`);
        res.end();
    }
    if (URL === `/student`) {
        res.setHeader('Content-Type', 'text/html');
        res.write(`                             <p style = "display: flex;">Student name: Mario</p>
                                                <p style = "display: flex;">Student lastname: Milchevski</p>
                                                <p style = "display: flex;">Academy: Qinshift</p>
                                                <p style = "display: flex;">Subject: NodeJS</p>
                     `)
        res.end();
    }
    if (URL === `/add_student`) {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<form action="/all_students" method="POST">
                    <input type="text" name="studentName" />
                    <button type="submit">Add Student</button>
                    </form>`);
        res.end();
    }
    if (URL === `/all_students`) {
        const body = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const studentName = parsedBody.split('=')[1].replace(/\+/g, ' ');
            const PATH = path.join(import.meta.dirname, 'students.txt');
            fs.appendFileSync(PATH, `${studentName}\n`);
            const students = fs.readFileSync(PATH, 'utf-8');
            res.setHeader('Content-Type', 'text/html');
            res.write(`<p>Students at Qinshift:</p>`);
            const studNames = students.split('\n').filter(Boolean);
            studNames.forEach(student => res.write(`Student name: ${student}<br>`))
            res.end()
        });

    }

})

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server listening: http://${HOSTNAME}:${PORT}`);
});