const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const login = async (req, res) => {
    res.send('Logueate bro');
    
    res.status(StatusCodes.OK);
};

module.exports = { login };
