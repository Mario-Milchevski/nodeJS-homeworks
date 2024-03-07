import EventEmitter from 'events';
import { appendData } from './db.service.js';
import path from 'path';

const logsPath = path.join(import.meta.dirname,
    "..",
    "data",
    "logs.txt");

class LoggerEmitter extends EventEmitter {};

const logger = new LoggerEmitter();

logger.on('log', msg => {
    const currTime = new Date().toISOString();
    const data = `
    ------------------------------------------
    ${msg}
    Logged at: ${currTime}
    ==========================================
    `;
    appendData(logsPath, data)    
});

export default logger;