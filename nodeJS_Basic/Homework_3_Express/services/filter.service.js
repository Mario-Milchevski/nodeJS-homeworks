export function filterTrainers(trainers, params) {
    let filteredTrainers = trainers;

    // Filter by currentlyActive status with query params
    if (!params.currentlyActive && !params.sortBy) {
        // logger.emit('log', `GET All students.`);
        //i don't know why this couldn't work ------------------ when i run the debugger before it enters the 
        // logger emit it goes to a file named "layer.js" from express and something is going on there
        return filteredTrainers;
    }
    if (params.currentlyActive == false) {
        filteredTrainers = filteredTrainers.filter(t => t.currentlyActive === false);
        logger.emit('log', `GET Currently Active students.`);

    }
    if (params.currentlyActive === true) {
        filteredTrainers = filteredTrainers.filter(t => t.currentlyActive === true)
        logger.emit('log', `GET Currently Non-Active students.`);

    }
    // Sort by Finished Courses Count using query param
    // Ascending
    if (params.sortBy === 'completedCoursesAsc') {
        filteredTrainers.sort((a, b) => a.coursesFinishedCount - b.coursesFinishedCount);
        logger.emit('log', `GET students sorted by finished courses count in ascending order.`);

    }
    // Descending
    if (params.sortBy === 'completedCoursesDesc') {
        filteredTrainers.sort((a, b) => b.coursesFinishedCount - a.coursesFinishedCount);
        logger.emit('log', `GET students sorted by finished courses count in descending order.`);

    }
    return filteredTrainers;
};