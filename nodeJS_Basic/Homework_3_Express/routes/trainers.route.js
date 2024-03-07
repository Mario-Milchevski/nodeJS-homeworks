import { Router } from "express";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readData, writeData } from '../services/db.service.js';
import logger from '../services/logger.service.js';
import { filterTrainers } from "../services/filter.service.js";

const trainersPath = path.join(
    import.meta.dirname,
    '..',
    'data',
    'trainers.json'
);
// Creating router to allow us to list the routes needed
const router = Router();

//Get ALL trainers
router.get('', (req, res) => {
    const params = {
        currentlyActive: req.query.currentlyActive ? JSON.parse(req.query.currentlyActive) : undefined,
        sortBy: req.query.sortBy
    }

    const trainers = readData(trainersPath);
    const filteredTrainers = filterTrainers(trainers, params)
    res.send(filteredTrainers);
});

//Get ONE trainer
router.get('/:id', (req, res) => {
    const id = req.params.id;
    logger.emit('log', `GET trainer with ID: ${id}.`);
    const trainers = readData(trainersPath);
    const trainer = trainers.find(t => t.id === id);
    res.send(trainer);
});
//Create ONE trainer
router.post('', (req, res) => {
    const trainer = req.body;
    logger.emit('log', `CREATE Trainer with Body: ${JSON.stringify(trainer)}.`);

    const newTrainer = {
        id: uuidv4(),
        ...trainer,
    };
    const trainers = readData(trainersPath);
    trainers.push(newTrainer);
    writeData(trainersPath, trainers)
    res.status(201).send(trainers);
});
// Update any property but in this particular example i will use it to change the active status
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    logger.emit('log', `UPDATE Trainer with ID: ${id}.`);

    const trainers = readData(trainersPath);
    const index = trainers.findIndex(t => t.id === id);
    trainers[index] = {
        ...body,
        id
    };
    writeData(trainersPath, trainers)
    res.send(trainers[index]);
});
//Update Time Employed
router.patch('/:id/timeEmployed', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    logger.emit('log', `UPDATE Trainer's "time-employed" with Trainer's ID: ${id}.`);

    const trainers = readData(trainersPath);
    const index = trainers.findIndex(t => t.id === id);
    trainers[index].timeEmployed = body.timeEmployed;
    writeData(trainersPath, trainers);
    res.send(trainers[index]);
});
//Update Courses Finished Count
router.patch('/:id/coursesFinishedCount', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    logger.emit('log', `UPDATE Trainer's "completed-courses-count" with Trainer's ID: ${id}.`);

    const trainers = readData(trainersPath);
    const index = trainers.findIndex(t => t.id === id);
    trainers[index].coursesFinishedCount = body.coursesFinishedCount;
    writeData(trainersPath, trainers);
    res.send(trainers[index]);
});
// Delete ONE trainer
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    logger.emit('log', `DELETE Trainer with ID: ${id}.`);

    const trainers = readData(trainersPath);
    const filteredTrainers = trainers.filter(t => t.id !== id);
    writeData(trainersPath, filteredTrainers);
    res.sendStatus(204);
});
// Delete ALL trainers
router.delete('', (req, res) => {
    logger.emit('log', `DELETE ALL Trainers`);

    const deleteAll = [];
    writeData(trainersPath, deleteAll);
    res.sendStatus(204);
});

export default router;