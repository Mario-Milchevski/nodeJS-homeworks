import express from 'express';
import cors from 'cors';
import router from './consts/router.const.js'

const app = express();

const PORT = 3000;
const HOSTNAME = 'localhost';

//Middlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Made API Call to ${req.method}: ${req.url} on ${new Date().toISOString()}`);
    next();
});

//Routes
app.use('/api', router);
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening on http://${HOSTNAME}:${PORT}`);
});
