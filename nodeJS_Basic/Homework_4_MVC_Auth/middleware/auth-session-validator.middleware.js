const validateAuthSession = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn) {
        next();
    } else {
        res.status(403).send({ message: 'Forbidden' });
    }
};

export default validateAuthSession;