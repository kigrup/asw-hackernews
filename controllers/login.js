const { StatusCodes } = require('http-status-codes');
const User = require('../db/models/User');

const login = async (req, res) => {
    try {
        res.status(StatusCodes.OK).send(`You're logged in Captain!`);
    } catch (e) {
        console.log('Error on /login');
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const apply = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password,
        });
        res.send(`username: ${user.username} email: ${user.email}`);
    } catch (e) {
        console.log('Error registering user');
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { login, apply };
