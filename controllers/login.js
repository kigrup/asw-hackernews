const { StatusCodes } = require('http-status-codes');
const User = require('../db/models/User');
const logger = require('../utils/logger');

const login = async (req, res) => {
    try {
        res.status(StatusCodes.OK).send(`You're logged in Captain!!!!`);
    } catch (e) {
        logger.info('Error on /login');
        logger.info(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const apply = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            username: username,
            email: email,
            password: password,
        });
        res.send(`username: ${user.username} email: ${user.email}`);
    } catch (e) {
        logger.info('Error registering user');
        logger.info(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { login, apply };
