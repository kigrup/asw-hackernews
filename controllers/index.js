const { StatusCodes } = require('http-status-codes');

const index = async (req, res) => {
    res.status(StatusCodes.OK).send('Casa dulce casa');
};

const newest = async (req, res) => {
    res.status(StatusCodes.OK).send('Casa dulce casa /newest');
};

module.exports = { index, newest };
