import logger from '../services/logger.service.js';

export function filterTrainers(trainers, params) {
    let filteredTrainers = trainers;

    // Filter by currentlyActive status with query params
    if (params.currentlyActive === undefined && params.sortBy === undefined) {
        logger.emit('log', `GET All trainers.`);
        return filteredTrainers;
    }
    if (params.currentlyActive == false) {
        filteredTrainers = filteredTrainers.filter(t => t.currentlyActive === false);
        logger.emit('log', `GET Currently Non-Active trainers.`);

    }
    if (params.currentlyActive === true) {
        filteredTrainers = filteredTrainers.filter(t => t.currentlyActive === true)
        logger.emit('log', `GET Currently Active trainers.`);

    }
    // Sort by Finished Courses Count using query param
    // Ascending
    if (params.sortBy === 'completedCoursesAsc') {
        filteredTrainers.sort((a, b) => a.coursesFinishedCount - b.coursesFinishedCount);
        logger.emit('log', `GET trainers sorted by finished courses count in ASCENDING order.`);

    }
    // Descending
    if (params.sortBy === 'completedCoursesDesc') {
        filteredTrainers.sort((a, b) => b.coursesFinishedCount - a.coursesFinishedCount);
        logger.emit('log', `GET trainers sorted by finished courses count in DESCENDING order.`);

    }
    return filteredTrainers;
};