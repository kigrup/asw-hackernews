const { StatusCodes } = require('http-status-codes');
const User = require('../db/models/User');

const login = async (req, res) => {
    try {
        const user = await User.create({
            username: 'Raul',
            email: 'raul.plesa@gmail.com',
        });
        console.log('User created successfully!');
        res.status(StatusCodes.OK);
    } catch (e) {
        console.log('Error on /login');
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const apply = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findAll({
            attributes: ['username', 'password'],
            where: {
                username: username,
            },
        });
        res.send(`username: ${user.username} email: ${user.email}`);
    } catch (e) {
        console.log('Error registering user');
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = { login, apply };
