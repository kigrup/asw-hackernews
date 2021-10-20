const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
    const logged = true;
    if (logged) {
        next();
    } else {
        res.status(StatusCodes.OK).send(`You're not logged in Captain!`);
    }
};

module.exports = auth;
