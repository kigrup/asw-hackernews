const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const login = async (req, res) => {
    try {
        res.status(StatusCodes.OK).send(`You're logged in Captain!!!!`);
    } catch (e) {
        console.log('Error on /login');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const apply = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await db.users.create({
            username: username,
            email: email,
        });
        res.send(
            `Registered: {username: ${user.username} email: ${user.email}}`
        );
    } catch (e) {
        console.log('Error registering user');
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { login, apply };
