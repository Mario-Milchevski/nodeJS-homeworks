import "dotenv/config";
import express from 'express';
import router from './consts/router.const.js'
import { connect } from "mongoose";
import { MONGO_URI } from "./consts/db.const.js";


const app = express();
app.use(express.json());
app.use('/api', router);

// A basic middleware that logs the request method, url and date in terminal
app.use((req, res, next) => {
    console.log(`Made API Call to ${req.method}: ${req.url} on ${new Date().toISOString()}`);
    next();
});

// Connection to DB
connect(MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, process.env.HOST, async () => {
            console.log(`The server is listening at port: ${process.env.PORT} and host: ${process.env.HOST}`
            );
        });
    })
    .catch(e => {
        console.log(`Issue while connecting to Mongo DB`, { e });
    });