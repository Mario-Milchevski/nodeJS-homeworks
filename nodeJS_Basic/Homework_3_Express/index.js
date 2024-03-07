// It was a battle since yesterday but i think i made it
// I'm gonna work on improving my speed now

import express from "express";
import path from 'path';
import router from './router.const.js';
import cors from 'cors';

const PORT = 3000;
const HOSTNAME = 'localhost';
const app = express();
const staticPagePath = path.join(import.meta.dirname, 'public');

// Body-parser of incoming requests
app.use(express.json());

// CORS Allowing the front-end to fetch the API 
app.use(cors());

// Static page
app.use('/home', express.static(staticPagePath));

// The MAIN router start-point
app.use('/api', router);

// SERVER initialization
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started listening at http://${HOSTNAME}:${PORT}`);
});
