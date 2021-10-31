const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const login = async (req, res) => {
    try {
        res.redirect('/login/google');
    } catch (e) {
        console.log('Error on /login');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { login };
